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
