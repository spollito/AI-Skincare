// Create a new file named app.js in the same directory as index.html
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections
    const splashSection = document.getElementById('splash-section');
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');

    // Get all buttons and links
    const showLoginBtn = document.getElementById('show-login');
    const showSignupBtn = document.getElementById('show-signup');
    const switchToLoginLink = document.getElementById('switch-to-login');
    const switchToSignupLink = document.getElementById('switch-to-signup');

    // Function to show a section and hide others
    function showSection(sectionToShow) {
        [splashSection, loginSection, signupSection].forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        sectionToShow.classList.remove('hidden');
        sectionToShow.classList.add('active');
    }

    // Add click event listeners
    showLoginBtn.addEventListener('click', () => showSection(loginSection));
    showSignupBtn.addEventListener('click', () => showSection(signupSection));
    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(loginSection);
    });
    switchToSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(loginSection);
    });

    // Handle form submissions
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login form submitted');
    });

    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup form submitted');
    });
});