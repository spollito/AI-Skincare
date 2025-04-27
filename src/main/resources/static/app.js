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
