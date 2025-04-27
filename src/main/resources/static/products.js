document.addEventListener('DOMContentLoaded', function() {
    // Add index to each product card for staggered animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards2 = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            // Filter products
            productCards2.forEach(card => {
                // Reset animations
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow

                if (selectedCategory === 'all' || card.getAttribute('data-category') === selectedCategory) {
                    card.style.display = 'block';
                    // Re-apply animation with delay based on index
                    card.style.animation = `fadeInUp 0.6s ease forwards ${parseInt(card.style.getPropertyValue('--index')) * 0.1}s`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.product-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Handle view product buttons in recommendations
    const viewProductBtns = document.querySelectorAll('.view-product-btn');
    viewProductBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.previousElementSibling.textContent;

            // Find the matching product card
            const matchingCard = Array.from(productCards).find(card =>
                card.querySelector('h3').textContent.includes(productName)
            );

            if (matchingCard) {
                // Scroll to the product card
                matchingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Highlight the card
                matchingCard.classList.add('highlight-card');
                setTimeout(() => {
                    matchingCard.classList.remove('highlight-card');
                }, 2000);
            }
        });
    });

    // Add highlight animation for product cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlightPulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 154, 162, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(255, 154, 162, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 154, 162, 0); }
        }

        .highlight-card {
            animation: highlightPulse 1.5s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Add to cart button functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.closest('.product-info').querySelector('h3').textContent;
            showNotification(`${productName} details viewed`);
        });
    });

    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});
