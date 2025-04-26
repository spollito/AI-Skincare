// app.js

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');

loginBtn.addEventListener('click', () => {
  loginModal.classList.add('active');
  overlay.classList.add('active');
});

closeModal.addEventListener('click', () => {
  loginModal.classList.remove('active');
  overlay.classList.remove('active');
});

// Also close if they click on the dark background
overlay.addEventListener('click', () => {
  loginModal.classList.remove('active');
  overlay.classList.remove('active');
});

// In your app.js file, add the following to the login button event handler
document.addEventListener('DOMContentLoaded', function() {
  const loginModal = document.getElementById('loginModal');
  const overlay = document.getElementById('overlay');
  const loginBtn = document.getElementById('loginBtn');
  const closeModal = document.getElementById('closeModal');

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

  // Login functionality
  const loginSubmitBtn = document.querySelector('.login-content .btn');
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', function() {
      // For now, we're just redirecting without actual authentication
      window.location.href = '/dashboard';
    });
  }
});
