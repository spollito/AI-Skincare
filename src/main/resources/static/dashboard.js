// dashboard.js - Dashboard specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard features
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Handle card clicks based on which feature was selected
            const featureTitle = this.querySelector('h3').textContent;

            if (featureTitle === 'Skin Analysis') {
                // Navigate to skin analysis page or open a modal
                console.log('Navigating to skin analysis');
                // window.location.href = '/analysis';
            } else if (featureTitle === 'Product Recommendations') {
                // Navigate to recommendations page
                console.log('Navigating to product recommendations');
                // window.location.href = '/recommendations';
            } else if (featureTitle === 'Skincare Routine') {
                // Navigate to routine page
                console.log('Navigating to skincare routine');
                // window.location.href = '/routine';
            }
        });
    });
});