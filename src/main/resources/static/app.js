document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');

  // Firebase auth reference
  const auth = firebase.auth();

  // Get UI elements
  const loginBtn = document.getElementById('loginBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const closeSignUpModalBtn = document.getElementById('closeSignUpModal');
  const signUpLink = document.getElementById('signUpLink');
  const loginLink = document.getElementById('loginLink');
  const overlay = document.getElementById('overlay');
  const loginModal = document.getElementById('loginModal');
  const signUpModal = document.getElementById('signUpModal');
  // *** ADDED: Get the sign out link element ***
  const signOutLink = document.getElementById('signOutLink');

  // --- Helper Functions for Modals ---
  function showModal(modalElement) {
    if (modalElement && overlay) {
      overlay.classList.add('active');
      modalElement.classList.add('active');
      console.log(`Showing modal: #${modalElement.id}`);
    } else {
      console.error('Modal or overlay element not found for showing.');
    }
  }

  function hideModal(modalElement) {
    if (modalElement && overlay) {
      overlay.classList.remove('active');
      modalElement.classList.remove('active');
      console.log(`Hiding modal: #${modalElement.id}`);
    } else {
      console.error('Modal or overlay element not found for hiding.');
    }
  }

  function hideAllModals() {
    if (overlay) overlay.classList.remove('active');
    if (loginModal) loginModal.classList.remove('active');
    if (signUpModal) signUpModal.classList.remove('active');
    console.log('Hiding all modals');
  }


  // --- Event Handlers ---

  function handleShowLoginModal() {
    hideModal(signUpModal);
    showModal(loginModal);
  }

  function handleLoggedInUserClick() {
    // Redirect to dashboard if logged in
    window.location.href = '/dashboard';
  }
  // --- Sign Out Handler ---
  function handleSignOut(e) {
    e.preventDefault(); // Prevent default link behavior
    console.log('Attempting sign out...');
    auth.signOut().then(() => {
      console.log("User signed out successfully.");
      // Redirect to the home page after sign out
      window.location.href = '/';
    }).catch((error) => {
      console.error("Sign out error:", error);
      alert("Error signing out: " + error.message);
    });
  }


  // --- Attach Event Listeners ---

  // Add initial listener for login button (on index page)
  if (loginBtn) {
    // Initial state: shows login modal
    loginBtn.addEventListener('click', handleShowLoginModal);
    console.log('Added initial click event listener to login button');
  }

  // Add listener for sign out link (on dashboard page)
  // Now this check works because signOutLink was fetched earlier
  if (signOutLink) {
    signOutLink.addEventListener('click', handleSignOut);
    console.log('Added click event listener to sign out link');
  }


  // Event listeners for closing modals
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => hideModal(loginModal));
  }
  if (closeSignUpModalBtn) {
    closeSignUpModalBtn.addEventListener('click', () => hideModal(signUpModal));
  }
  if (overlay) {
    overlay.addEventListener('click', hideAllModals);
  }

  // Event listeners for switching between modals
  if (signUpLink) {
    signUpLink.addEventListener('click', function(e) {
      e.preventDefault();
      hideModal(loginModal);
      showModal(signUpModal);
    });
  }

  if (loginLink) {
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      hideModal(signUpModal);
      showModal(loginModal);
    });
  }


  // --- Firebase Auth Logic ---

  // Handle login form submission
  // Consider adding specific IDs like 'loginEmailInput', 'loginPasswordInput', 'modalLoginSubmitBtn'
  // to the HTML for more robust selection.
  const loginFormButton = loginModal ? loginModal.querySelector('button.btn') : null;
  if (loginFormButton) {
    loginFormButton.addEventListener('click', function() {
      // Using placeholder selectors - prone to breaking if placeholders change
      const emailInput = loginModal.querySelector('input[placeholder="Email"]'); // Assuming email uses 'text' type or placeholder "Email"
      const passwordInput = loginModal.querySelector('input[placeholder="Password"]');
      const email = emailInput ? emailInput.value : null;
      const password = passwordInput ? passwordInput.value : null;

      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      console.log(`Attempting login for: ${email}`);
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log("Login successful for user:", userCredential.user.uid);
            // Redirect to dashboard on successful login
            window.location.href = '/dashboard';
            hideModal(loginModal); // Hide modal after successful login attempt
          })
          .catch((error) => {
            console.error("Login error:", error.code, error.message);
            alert("Login error: " + error.message);
          });
    });
  } else if (loginModal) {
    console.error('Login button inside login modal not found! Check selector `button.btn`.');
  }


  // Handle sign up form submission
  // Consider adding specific IDs to sign-up form elements as well.
  const signUpFormButton = signUpModal ? signUpModal.querySelector('button.btn') : null;
  if (signUpFormButton) {
    signUpFormButton.addEventListener('click', function() {
      // Using placeholder selectors - less robust
      const nameInput = signUpModal.querySelector('input[placeholder="Name"]');
      const emailInput = signUpModal.querySelector('input[placeholder="Email"]');
      const passwordInput = signUpModal.querySelector('input[placeholder="Password"]');
      const confirmPasswordInput = signUpModal.querySelector('input[placeholder="Confirm Password"]');

      const name = nameInput ? nameInput.value : '';
      const email = emailInput ? emailInput.value : null;
      const password = passwordInput ? passwordInput.value : null;
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : null;


      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }

      console.log(`Attempting sign up for: ${email}`);
      auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Sign up successful for user:", user.uid);
            // Update profile immediately after creation
            return user.updateProfile({ displayName: name });
          })
          .then(() => {
            console.log("User profile updated with display name.");
            hideModal(signUpModal); // Hide sign-up modal

            // Inform user and optionally show login modal pre-filled
            alert("Sign up successful! Please log in.");

            // Optionally pre-fill and show login modal
            const loginEmailInput = loginModal.querySelector('input[placeholder="Email"]');
            const loginPasswordInput = loginModal.querySelector('input[placeholder="Password"]');
            if (loginEmailInput && loginPasswordInput) {
              loginEmailInput.value = email; // Pre-fill email
              loginPasswordInput.value = ''; // Clear password field for security
            } else {
              console.error("Could not find login modal input fields to pre-fill.");
            }
            showModal(loginModal); // Show the login modal

          })
          .catch((error) => {
            console.error("Sign up error:", error.code, error.message);
            // Display more specific error messages if possible
            if (error.code === 'auth/email-already-in-use') {
              alert('Sign up error: This email address is already in use.');
            } else if (error.code === 'auth/weak-password') {
              alert('Sign up error: The password is too weak.');
            } else {
              alert("Sign up error: " + error.message);
            }
          });
    });
  } else if (signUpModal) {
    console.error('Sign up button inside sign up modal not found! Check selector `button.btn`.');
  }


  // --- Auth State Change Listener (Handles UI updates) ---
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("Auth state changed: User is logged in", user.uid, user.displayName);
      if (loginBtn) {
        // If loginBtn exists (on index.html), update its text and behavior
        loginBtn.textContent = user.displayName || "My Account"; // Use display name
        loginBtn.removeEventListener('click', handleShowLoginModal); // Remove old listener
        loginBtn.addEventListener('click', handleLoggedInUserClick); // Add new listener (go to dashboard)
        console.log("Updated login button for logged-in state.");
      }
      // You might want to update dashboard elements here too if the user logs in
      // while already on the dashboard page (e.g., via remember me).
      const profileImage = document.querySelector('.user-profile .profile-image');
      if(profileImage && user.photoURL) { // Example: update profile pic if available
        profileImage.src = user.photoURL;
      }

    } else {
      // User is signed out.
      console.log("Auth state changed: User is logged out");
      if (loginBtn) {
        // If loginBtn exists (on index.html), revert its text and behavior
        loginBtn.textContent = "Login";
        loginBtn.removeEventListener('click', handleLoggedInUserClick); // Remove dashboard listener
        loginBtn.addEventListener('click', handleShowLoginModal); // Re-add modal listener
        console.log("Updated login button for logged-out state.");
      }

      // Redirect if logged out while on a protected page like dashboard
      if (window.location.pathname === '/dashboard') {
        console.log("User logged out while on dashboard, redirecting to home.");
        window.location.href = '/'; // Redirect to home page
      }
    }
  });


  // --- Flower Petal Animation (Keep as is if working) ---
  console.log('Initializing flower petals...');
  const logo = document.querySelector('.logo');
  const petalContainer = document.querySelector('.flower-petals-container');

  if (logo && petalContainer) {
    const logoWidth = logo.offsetWidth;
    petalContainer.style.left = (logoWidth + 20) + 'px';
    petalContainer.style.width = `calc(100% - ${logoWidth + 20}px)`;

    if (petalContainer.querySelectorAll('.petal').length === 0) {
      for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 10 + 15;
        const startPosition = Math.random() * 70 + 10;
        const delay = Math.random() * 8;
        const duration = Math.random() * 5 + 10;
        const opacity = Math.random() * 0.3 + 0.2;

        petal.style.cssText = `
                position: absolute; top: ${startPosition}%; left: -50px; width: ${size}px; height: ${size}px;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255, 154, 162, ${opacity})"><path d="M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8zm0 10a2 2 0 100-4 2 2 0 000 4z"/></svg>');
                background-size: contain; background-repeat: no-repeat; opacity: 0; z-index: 1; pointer-events: none;
                animation: petalFloat ${duration}s linear ${delay}s infinite;
            `;
        petalContainer.appendChild(petal);
      }

      if (!document.getElementById('petalFloatKeyframes')) {
        const style = document.createElement('style');
        style.id = 'petalFloatKeyframes';
        style.textContent = `
                @keyframes petalFloat {
                    0% { left: -50px; transform: rotate(0deg) translateY(0px) scale(0.8); opacity: 0; }
                    5% { opacity: 1; }
                    50% { transform: rotate(180deg) translateY(20px) scale(1); }
                    95% { opacity: 1; }
                    100% { left: calc(100% + 50px); transform: rotate(360deg) translateY(0px) scale(0.8); opacity: 0; }
                }`;
        document.head.appendChild(style);
        console.log('Added petalFloat keyframes.');
      }
    } else {
      console.log('Petals already exist, skipping creation.');
    }
  } else {
    // It's normal for this to happen on dashboard.html if the elements aren't there
    // console.warn('Logo or petal container not found for petal animation setup.');
  }

}); // End DOMContentLoaded