// app.js

document.addEventListener('DOMContentLoaded', function() {
  const loginModal = document.getElementById('loginModal');
  const signUpModal = document.getElementById('signUpModal');
  const overlay = document.getElementById('overlay');
  const loginBtn = document.getElementById('loginBtn');
  const closeModal = document.getElementById('closeModal');
  const closeSignUpModal = document.getElementById('closeSignUpModal');
  const signUpLink = document.getElementById('signUpLink');
  const loginLink = document.getElementById('loginLink');

  // Show login modal
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      loginModal.classList.add('active');
      overlay.classList.add('active');
    });
  }

  // Close login modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      loginModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Close sign up modal
  if (closeSignUpModal) {
    closeSignUpModal.addEventListener('click', function() {
      signUpModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Switch from login to sign up
  if (signUpLink) {
    signUpLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginModal.classList.remove('active');
      signUpModal.classList.add('active');
    });
  }

  // Switch from sign up to login
  if (loginLink) {
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      signUpModal.classList.remove('active');
      loginModal.classList.add('active');
    });
  }

  // Close modals when clicking on overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      loginModal.classList.remove('active');
      signUpModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Login functionality
  const loginSubmitBtn = document.querySelector('#loginModal .btn');
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', function() {
      // For now, we're just redirecting without actual authentication
      window.location.href = '/dashboard';
    });
  }

  // Sign up functionality
  const signUpSubmitBtn = document.querySelector('#signUpModal .btn');
  if (signUpSubmitBtn) {
    signUpSubmitBtn.addEventListener('click', function() {
      // For now, we're just redirecting without actual registration
      window.location.href = '/dashboard';
    });
  }
});



// Create flowing flower petals
document.addEventListener('DOMContentLoaded', function() {
  // Get the logo width to position petals after it
  const logo = document.querySelector('.logo');
  const logoWidth = logo.offsetWidth;
  const petalContainer = document.querySelector('.flower-petals-container');

  // Set the container position based on the logo width
  petalContainer.style.left = (logoWidth + 20) + 'px'; // 20px buffer
  petalContainer.style.width = `calc(100% - ${logoWidth + 20}px)`;

  // Create 12 petals with varied properties
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Randomize properties for natural look
    const size = Math.random() * 10 + 15; // 15-25px
    const startPosition = Math.random() * 70 + 10; // 10-80% from top
    const delay = Math.random() * 8; // 0-8s delay
    const duration = Math.random() * 5 + 10; // 10-15s animation
    const opacity = Math.random() * 0.3 + 0.2; // 0.2-0.5 opacity

    // Apply custom styling
    petal.style.cssText = `
      position: absolute;
      top: ${startPosition}%;
      left: -50px;
      width: ${size}px;
      height: ${size}px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255, 154, 162, ${opacity})"><path d="M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8zm0 10a2 2 0 100-4 2 2 0 000 4z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0;
      z-index: 1;
      pointer-events: none;
      animation: petalFloat ${duration}s linear ${delay}s infinite;
    `;

    petalContainer.appendChild(petal);
  }

  // Add the keyframe animation to the document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes petalFloat {
      0% {
        left: -50px;
        transform: rotate(0deg) translateY(0px) scale(0.8);
        opacity: 0;
      }
      5% {
        opacity: 1;
      }
      50% {
        transform: rotate(180deg) translateY(20px) scale(1);
      }
      95% {
        opacity: 1;
      }
      100% {
        left: calc(100% + 50px);
        transform: rotate(360deg) translateY(0px) scale(0.8);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});




