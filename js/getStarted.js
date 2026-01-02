// Read URL parameters
const params = new URLSearchParams(window.location.search);
const service = params.get('service');
const packageName = params.get('package');

// Elements
const serviceSelect = document.getElementById('serviceType');
const packageSelect = document.getElementById('packageType');
const webFields = document.getElementById('webFields');
const videoFields = document.getElementById('videoFields');

// Pre-fill values
if (service) serviceSelect.value = service;
if (packageName) packageSelect.value = packageName;

// Toggle fields
function toggleFields() {
    if (serviceSelect.value === 'video') {
        webFields.style.display = 'none';
        videoFields.style.display = 'block';
    } else {
        webFields.style.display = 'block';
        videoFields.style.display = 'none';
    }
}

serviceSelect.addEventListener('change', toggleFields);
toggleFields();
