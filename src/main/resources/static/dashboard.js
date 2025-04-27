
document.addEventListener('DOMContentLoaded', function() {
    // Make the Skin Analysis card clickable
    const skinAnalysisCard = document.querySelector('.card:nth-child(1)');
    if (skinAnalysisCard) {
        skinAnalysisCard.style.cursor = 'pointer';
        skinAnalysisCard.addEventListener('click', function(event) {
            // Prevent event bubbling
            event.stopPropagation();
            // Navigate to the analysis page
            window.location.href = '/analysis';
        });
    }

    // Navigate to analysis page when "New Analysis" button is clicked
    const analysisBtn = document.querySelector('.empty-analysis .btn');
    if (analysisBtn) {
        analysisBtn.addEventListener('click', function() {
            // Replace button text with loading animation
            this.innerHTML = '<span class="loading-animation">Processing</span>';
            this.classList.add('loading');

            // Simulate loading (replace with actual upload functionality)
            setTimeout(() => {
                // Reset button
                this.innerHTML = 'New Analysis';
                this.classList.remove('loading');

                // Show success message
                showNotification('Ready for your selfie!');

                // Navigate to the analysis page after showing notification
                setTimeout(() => {
                    window.location.href = '/analysis';
                }, 1000);
            }, 2000);
        });
    }

    // Add interactive effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle movement to the card images
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.5s ease';
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });

        // Add click animation
        card.addEventListener('click', function() {
            this.classList.add('card-click');
            setTimeout(() => {
                this.classList.remove('card-click');
            }, 300);
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

    // Add additional CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ff9aa2;
            color: white;
            padding: 15px 25px;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .loading-animation::after {
            content: '...';
            animation: loadingDots 1.5s infinite;
        }
        
        @keyframes loadingDots {
            0%, 20% { content: '.'; }
            40%, 60% { content: '..'; }
            80%, 100% { content: '...'; }
        }
        
        .card-click {
            animation: clickEffect 0.3s ease;
        }
        
        @keyframes clickEffect {
            0% { transform: scale(1); }
            50% { transform: scale(0.98); }
            100% { transform: scale(1); }
        }
        
        .btn.loading {
            background-color: #ffb3b9;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});

// Make the Product Recommendations card clickable
const productRecommendationsCard = document.querySelector('.card:nth-child(2)');
if (productRecommendationsCard) {
    productRecommendationsCard.style.cursor = 'pointer';
    productRecommendationsCard.addEventListener('click', function(event) {
        // Prevent event bubbling
        event.stopPropagation();
        // Navigate to the products page
        window.location.href = '/products';
    });
}
