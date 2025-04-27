// analysis.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadText = document.getElementById('upload-text');
    const imagePreview = document.getElementById('image-preview');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsSection = document.getElementById('results-section');

    // Handle click on upload area
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.classList.add('highlight');
    }

    function unhighlight() {
        uploadArea.classList.remove('highlight');
    }

    // Handle file drop
    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            handleFiles(files);
        }
    }

    // Handle file input change
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });

    // Process the files
    function handleFiles(files) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            displayPreview(file);
            analyzeBtn.disabled = false;
        } else {
            alert('Please upload an image file (JPEG, PNG, etc.)');
        }
    }

    // Display image preview
    function displayPreview(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Hide upload icon and text
            uploadIcon.classList.add('hidden');
            uploadText.classList.add('hidden');

            // Show image preview
            imagePreview.classList.remove('hidden');
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        }

        reader.readAsDataURL(file);
    }

    // Handle analyze button click
    analyzeBtn.addEventListener('click', function() {
        // Here you would typically send the image to your backend for analysis
        // For now, we'll just simulate loading and show a mock result
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';

        setTimeout(function() {
            showResults();
            analyzeBtn.textContent = 'Get Analysis';
            analyzeBtn.disabled = false;

            // Add the analyzed image to the previous analyses section
            addToPreviousAnalyses();
        }, 2000);
    });

    // Show results
    function showResults() {
        resultsSection.classList.remove('hidden');
        resultsSection.querySelector('.results-content').innerHTML = `
            <div class="result-item">
                <h3>Skin Hydration</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: 65%"></div>
                </div>
                <p>65% - Moderately hydrated</p>
            </div>
            <div class="result-item">
                <h3>Oil Level</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: 45%"></div>
                </div>
                <p>45% - Normal</p>
            </div>
            <div class="result-item">
                <h3>Sensitivity</h3>
                <div class="progress-bar">
                    <div class="progress" style="width: 30%"></div>
                </div>
                <p>30% - Low sensitivity</p>
            </div>
        `;

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Add to previous analyses
    function addToPreviousAnalyses() {
        // Remove empty state if present
        const emptyAnalyses = document.getElementById('empty-analyses');
        if (emptyAnalyses) {
            emptyAnalyses.remove();
        }

        // Get image source from preview
        const imageSrc = imagePreview.querySelector('img').src;

        // Create date string
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Create analysis card
        const analysesGrid = document.getElementById('analyses-grid');
        const card = document.createElement('div');
        card.className = 'analysis-card';
        card.innerHTML = `
            <img src="${imageSrc}" alt="Analysis Image">
            <div class="analysis-info">
                <span class="analysis-date">${dateString}</span>
                <button class="btn secondary-btn view-btn">View Details</button>
            </div>
        `;

        // Add to grid
        analysesGrid.prepend(card);
    }
});
