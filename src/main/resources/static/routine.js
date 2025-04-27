document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const nextButtons = document.querySelectorAll('.next-btn');
    const backButtons = document.querySelectorAll('.back-btn');
    

    
    // Simple notification function
    function showNotification(message) {
        alert(message); // Using a simple alert for immediate feedback
    }

    // Handle radio button selection
    document.querySelectorAll('.radio-label').forEach(label => {
        label.addEventListener('click', function() {
            // Find the radio input inside this label
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Remove selected class from all other labels in same group
                const groupName = radio.getAttribute('name');
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(input => {
                    if (input.closest('.radio-label')) {
                        input.closest('.radio-label').classList.remove('selected');
                    }
                });
                
                // Add selected class to this label
                this.classList.add('selected');
            }
        });
    });
    
    // Direct click handler for radio inputs to ensure selection is visually reflected
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Get all radios in the same group
            const groupName = this.getAttribute('name');
            document.querySelectorAll(`input[name="${groupName}"]`).forEach(input => {
                if (input.closest('.radio-label')) {
                    input.closest('.radio-label').classList.remove('selected');
                }
            });
            
            // Add selected class to the container of the checked radio
            if (this.closest('.radio-label')) {
                this.closest('.radio-label').classList.add('selected');
            }
        });
    });
    
    // Next button handlers - simplified to just move to next step
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simple navigation - just go to next step
            const currentStep = parseInt(this.dataset.next) - 1; 
            const nextStep = parseInt(this.dataset.next);
            
            // Hide current step, show next step
            formSteps[currentStep].classList.add('hidden');
            formSteps[nextStep - 1].classList.remove('hidden');
            
            // Update progress indicators
            progressSteps[currentStep].classList.add('completed');
            progressSteps[nextStep - 1].classList.add('active');
            
            if (currentStep < progressLines.length) {
                progressLines[currentStep].classList.add('full');
            }
        });
    });
    
    // Back button handlers
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.prev);
            const prevStep = parseInt(this.dataset.prev) - 1;
            
            // Hide current step, show previous step
            formSteps[currentStep].classList.add('hidden');
            formSteps[prevStep].classList.remove('hidden');
            
            // Update progress indicators
            progressSteps[currentStep].classList.remove('active');
            progressSteps[prevStep].classList.add('active');
            
            if (prevStep < progressLines.length) {
                progressLines[prevStep].classList.remove('full');
            }
        });
    });
    
    // Elements for form navigation
    const analyzeButton = document.getElementById('analyze-btn');
    const routineForm = document.getElementById('routineForm');
    const routineResults = document.getElementById('routineResults');
    const restartButton = document.getElementById('restartBtn');

    // Function to show notification messages
    

    // Set up radio button selection highlighting
    

    // Form navigation with next buttons
    

    // Form navigation with back buttons
    

    // Scoring values for each answer
    const scoreValues = {
        // Step 1: Basics
        morning_cleanse: {
            never: 0,
            sometimes: 2.5,
            regularly: 3.5,
            always: 5
        },
        evening_cleanse: {
            never: 0,
            sometimes: 5,
            regularly: 7.5,
            always: 10
        },
        spf_use: {
            never: 0,
            sometimes: 3,
            regularly: 7,
            always: 10
        },

        // Step 2: Products
        moisturizer: {
            never: 0,
            sometimes: 3,
            regularly: 7,
            always: 10
        },
        eye_cream: {
            never: 0,
            sometimes: 3,
            regularly: 7,
            always: 10
        },
        serums: {
            never: 0,
            sometimes: 3,
            regularly: 7,
            always: 10
        },

        // Step 3: Habits
        exfoliate: {
            never: 0,
            once_month: 5,
            once_week: 10,
            multiple_week: 7 // Over-exfoliation can be harmful
        },
        face_masks: {
            never: 0,
            once_month: 5,
            once_week: 10,
            multiple_week: 7
        },
        water_intake: {
            less_4cups: 3,
            "4_6cups": 6,
            "6_8cups": 10,
            more_8cups: 10
        }
    };

    // Analyze button click handler
    analyzeButton.addEventListener('click', function() {
        // Validate that all questions in the last step are answered
        const currentStepElement = document.getElementById('step3');
        const questions = currentStepElement.querySelectorAll('.form-question');
        let allAnswered = true;

        questions.forEach(question => {
            const groupName = question.querySelector('input[type="radio"]').name;
            const answered = document.querySelector(`input[name="${groupName}"]:checked`);

            if (!answered) {
                allAnswered = false;
                question.classList.add('error');

                // Add animation to make error more noticeable
                question.addEventListener('animationend', function() {
                    this.classList.remove('error');
                }, {once: true});
            }
        });

        if (!allAnswered) {
            showNotification('Please answer all questions before proceeding', 'error');
            return;
        }

        // Calculate scores
        let totalScore = 0;
        let cleansingScore = 0;
        let sunProtectionScore = 0;
        let moisturizingScore = 0;
        let treatmentScore = 0;
        let habitsScore = 0;

        // Get cleansing score (morning_cleanse + evening_cleanse)
        const morningCleanseValue = document.querySelector('input[name="morning_cleanse"]:checked').value;
        const eveningCleanseValue = document.querySelector('input[name="evening_cleanse"]:checked').value;
        cleansingScore = scoreValues.morning_cleanse[morningCleanseValue] +
                         scoreValues.evening_cleanse[eveningCleanseValue];
        cleansingScore = Math.min(cleansingScore, 10); // Cap at 10

        // Get sun protection score
        const spfValue = document.querySelector('input[name="spf_use"]:checked').value;
        sunProtectionScore = scoreValues.spf_use[spfValue];

        // Get moisturizing score
        const moisturizerValue = document.querySelector('input[name="moisturizer"]:checked').value;
        moisturizingScore = scoreValues.moisturizer[moisturizerValue];

        // Get treatment score (eye_cream + serums)
        const eyeCreamValue = document.querySelector('input[name="eye_cream"]:checked').value;
        const serumsValue = document.querySelector('input[name="serums"]:checked').value;
        treatmentScore = (scoreValues.eye_cream[eyeCreamValue] +
                         scoreValues.serums[serumsValue]) / 2;

        // Get habits score (exfoliate + face_masks + water_intake)
        const exfoliateValue = document.querySelector('input[name="exfoliate"]:checked').value;
        const faceMasksValue = document.querySelector('input[name="face_masks"]:checked').value;
        const waterIntakeValue = document.querySelector('input[name="water_intake"]:checked').value;
        habitsScore = (scoreValues.exfoliate[exfoliateValue] +
                      scoreValues.face_masks[faceMasksValue] +
                      scoreValues.water_intake[waterIntakeValue]) / 3;

        // Calculate total score (100 max)
        totalScore = Math.round((cleansingScore + sunProtectionScore + moisturizingScore +
                     treatmentScore + habitsScore) * 2);

        // Update the results UI
        document.querySelector('.rating-score').textContent = totalScore;

        // Update breakdown scores
        const breakdownItems = document.querySelectorAll('.breakdown-item');

        // Cleansing
        breakdownItems[0].querySelector('.breakdown-score').textContent = `${cleansingScore.toFixed(1)}/10`;
        breakdownItems[0].querySelector('.breakdown-fill').style.width = `${cleansingScore * 10}%`;

        // Sun Protection
        breakdownItems[1].querySelector('.breakdown-score').textContent = `${sunProtectionScore.toFixed(1)}/10`;
        breakdownItems[1].querySelector('.breakdown-fill').style.width = `${sunProtectionScore * 10}%`;

        // Moisturizing
        breakdownItems[2].querySelector('.breakdown-score').textContent = `${moisturizingScore.toFixed(1)}/10`;
        breakdownItems[2].querySelector('.breakdown-fill').style.width = `${moisturizingScore * 10}%`;

        // Treatment Products
        breakdownItems[3].querySelector('.breakdown-score').textContent = `${treatmentScore.toFixed(1)}/10`;
        breakdownItems[3].querySelector('.breakdown-fill').style.width = `${treatmentScore * 10}%`;

        // Skincare Habits
        breakdownItems[4].querySelector('.breakdown-score').textContent = `${habitsScore.toFixed(1)}/10`;
        breakdownItems[4].querySelector('.breakdown-fill').style.width = `${habitsScore * 10}%`;

        // Generate recommendations based on scores
        const recommendationsList = document.getElementById('recommendationsList');
        recommendationsList.innerHTML = ''; // Clear existing recommendations

        // Add recommendations based on scores
        const recommendations = [];

        if (cleansingScore < 5) {
            recommendations.push("Consider a consistent cleansing routine both morning and night to remove impurities, oil, and makeup.");
        }

        if (sunProtectionScore < 7) {
            recommendations.push("Daily SPF is critical! Use at least SPF 30 every day, even when it's cloudy or you're indoors.");
        }

        if (moisturizingScore < 7) {
            recommendations.push("Regular moisturizing helps maintain your skin barrier and prevents dehydration. Find a moisturizer suited to your skin type.");
        }

        if (treatmentScore < 5) {
            recommendations.push("Add targeted treatments like serums with ingredients such as vitamin C, retinol, or niacinamide to address specific skin concerns.");
        }

        if (habitsScore < 5) {
            if (scoreValues.exfoliate[exfoliateValue] < 5) {
                recommendations.push("Regular exfoliation (1-2 times per week) helps remove dead skin cells and improves product absorption.");
            }

            if (scoreValues.water_intake[waterIntakeValue] < 6) {
                recommendations.push("Increase your daily water intake to at least 8 cups for better skin hydration from within.");
            }
        }

        // If the overall score is good, add a positive recommendation
        if (totalScore >= 80) {
            recommendations.push("Great job! Your routine is quite solid. Consider consulting with a dermatologist for personalized advice to further optimize your routine.");
        }

        // Ensure we have at least one recommendation
        if (recommendations.length === 0) {
            recommendations.push("Your routine has room for improvement. Consider adding more consistency to your skincare habits.");
        }

        // Add recommendations to the list
        recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = 'recommendation-item';
            recItem.textContent = rec;
            recommendationsList.appendChild(recItem);
        });

        // Hide form and show results
        routineForm.parentElement.classList.add('hidden');
        routineResults.classList.remove('hidden');

        // Scroll to top of results
        routineResults.scrollIntoView({ behavior: 'smooth' });
    });

    // Restart button click handler
    restartButton.addEventListener('click', function() {
        // Reset form
        routineForm.reset();

        // Clear selected classes
        document.querySelectorAll('.radio-label').forEach(label => {
            label.classList.remove('selected');
        });

        // Reset progress
        progressSteps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        progressLines.forEach(line => {
            line.classList.remove('half', 'full');
        });

        // Show first step
        formSteps.forEach((step, index) => {
            if (index === 0) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });

        // Hide results and show form
        routineResults.classList.add('hidden');
        routineForm.parentElement.classList.remove('hidden');

        // Scroll to top of form
        routineForm.scrollIntoView({ behavior: 'smooth' });
    });
});

