// Function to submit both images to backend and get access decision
async function submitForAccessCheck() {
    const vehicleInput = document.getElementById('vehicle-upload');
    const idInput = document.getElementById('id-upload');

    if (!vehicleInput.files.length || !idInput.files.length) {
        alert('Please upload both vehicle and ID card images before submitting.');
        return;
    }

    const formData = new FormData();
    formData.append('vehicleImage', vehicleInput.files[0]);
    formData.append('idCardImage', idInput.files[0]);

    // Optional: disable submit button during the request
    const submitBtn = document.getElementById('submit-access-btn');
    if (submitBtn) submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:5000/api/access-check', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Server error');
        }

        // Show result message
        alert(data.accessGranted ? 'Access Granted' : 'Access Denied');

        // Add log entry to frontend logs UI
        addLogEntry(
            data.accessGranted ? 'Access Granted' : 'Access Denied',
            `User: John Doe (mocked), Vehicle image and ID card processed.`
        );

        // Potentially refresh dashboard logs after new entry (optional)
        // fetchAndDisplayLogs();

    } catch (err) {
        alert('Error during access check: ' + err.message);
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}

// Add a dedicated submit button to your frontend HTML in either the vehicle or ID upload sections:
// Example:
// <button id="submit-access-btn" class="bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600" onclick="submitForAccessCheck()">Submit for Access Check</button>

// You can place this button below either upload section or in a new dedicated area.

// To keep logs synced with backend, you might want to fetch logs from backend and display them in the dashboard. Example function:

async function fetchAndDisplayLogs() {
    try {
        const res = await fetch('http://localhost:5000/api/access-logs');
        if (!res.ok) throw new Error('Failed to fetch logs');
        const logs = await res.json();
        const logsContainer = document.querySelector('.bg-gray-50.max-h-80');
        logsContainer.innerHTML = ''; // Clear existing logs

        logs.forEach(log => {
            const date = new Date(log.timestamp).toLocaleString();
            const status = log.accessGranted ? 'Access Granted' : 'Access Denied';
            const entry = document.createElement('div');
            entry.className = 'log-entry mb-3 p-3 bg-white rounded-lg border border-gray-200';
            entry.innerHTML = `
                <div class="flex justify-between items-start">
                    <p class="font-medium">${status}</p>
                    <span class="text-xs text-gray-500">${date}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">User: ${log.user}, ID: ${log.idNumber}</p>
            `;
            logsContainer.appendChild(entry);
        });
    } catch (e) {
        console.error('Error fetching logs:', e);
    }
}

// Optionally call fetchAndDisplayLogs on page load or dashboard tab visible:
document.addEventListener('DOMContentLoaded', fetchAndDisplayLogs);