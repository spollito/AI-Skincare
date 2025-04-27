// analysis.js - CORRECTED VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadIcon = document.getElementById('upload-icon');
    const uploadText = document.getElementById('upload-text');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsSection = document.getElementById('results-section');
    const skinAnalysisForm = document.getElementById('skin-analysis-form');

    // Check if the image preview element exists, if not create it
    let imagePreview = document.getElementById('image-preview');
    if (!imagePreview) {
        imagePreview = document.createElement('div');
        imagePreview.id = 'image-preview';
        imagePreview.className = 'hidden';
        uploadArea.appendChild(imagePreview);
    }

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

    // Handle form submission - SINGLE EVENT HANDLER
    skinAnalysisForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!fileInput.files.length) {
            alert("Please upload an image!");
            return;
        }

        // Disable button and show loading state
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';

        try {
            const formData = new FormData(skinAnalysisForm);

            // Send the image to the backend
            console.log("Sending request to /analyze endpoint");
            const response = await fetch('/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error (${response.status}): ${errorText}`);
            }

            // Get response data
            const result = await response.text();
            console.log("Received analysis result");

            // Show results in the UI
            showResults(result);

            // Add the analyzed image to previous analyses
            addToPreviousAnalyses();

        } catch (err) {
            console.error("Analysis error:", err);
            alert("Failed to analyze the image: " + err.message);
        } finally {
            // Reset button state
            analyzeBtn.textContent = 'Get Analysis';
            analyzeBtn.disabled = false;
        }
    });

    // Show results
    function showResults(analysisData) {
        resultsSection.classList.remove('hidden');

        // If the backend returns a formatted HTML or structured data, use it
        // Otherwise, for this example, we'll create a simple display
        const resultsContent = resultsSection.querySelector('.results-content');

        try {
            // Try to parse the data as JSON if it's in JSON format
            const jsonData = JSON.parse(analysisData);
            resultsContent.innerHTML = formatJsonResults(jsonData);
        } catch (e) {
            // If not JSON, display as text
            resultsContent.innerHTML = `<div class="result-text">${analysisData}</div>`;
        }

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Helper function to format JSON results (if your API returns JSON)
    function formatJsonResults(data) {
        // This is a placeholder - adjust based on your actual API response structure
        let html = '';

        // Example format (update based on your actual API response)
        if (data.skinConditions) {
            html += `<h3>Skin Conditions</h3>`;
            data.skinConditions.forEach(condition => {
                html += `
                    <div class="result-item">
                        <h4>${condition.name}</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${condition.confidence}%"></div>
                        </div>
                        <p>${condition.confidence}% - ${condition.description}</p>
                    </div>
                `;
            });
        } else {
            // For demo purposes, create mock results
            html = `
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
        }

        return html;
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

    // Handle "New Analysis" button on dashboard
    const newAnalysisBtn = document.getElementById('new-analysis-btn');
    if (newAnalysisBtn) {
        newAnalysisBtn.addEventListener('click', function() {
            window.location.href = '/analysis';
        });
    }
});

// REMOVE THIS ENTIRE DUPLICATE EVENT HANDLER
// The following code is a duplicate and should be deleted:
/*
document.getElementById('skin-analysis-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    // ... rest of the duplicate code ...
});
*/