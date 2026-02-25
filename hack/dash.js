// Fetch and render access logs in dashboard
async function fetchAndDisplayLogs() {
    try {
        const res = await fetch('http://localhost:5000/api/access-logs');
        if (!res.ok) throw new Error('Failed to fetch logs');
        const logs = await res.json();

        const logsContainer = document.querySelector('.bg-gray-50.max-h-80');
        logsContainer.innerHTML = ''; // Clear old logs

        // Display logs sorted latest first
        logs.forEach(log => {
            const date = new Date(log.timestamp).toLocaleString();
            const status = log.accessGranted ? 'Access Granted' : 'Access Denied';
            const statusColor = log.accessGranted ? 'text-success' : 'text-destructive';
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry mb-3 p-3 bg-white rounded-lg border border-gray-200';
            logEntry.innerHTML = `
                <div class="flex justify-between items-start">
                    <p class="font-medium">${status}</p>
                    <span class="text-xs text-gray-500">${date}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">User: ${log.user}, ID: ${log.idNumber}</p>
            `;
            logsContainer.appendChild(logEntry);

            // Show alert for failure access
            if (!log.accessGranted) {
                showAccessDeniedAlert(log);
            }
        });
    } catch (e) {
        console.error('Error fetching logs:', e);
    }
}

// Simple alert/banner in page for denied access
function showAccessDeniedAlert(log) {
    let alertBox = document.getElementById('access-denied-alert');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'access-denied-alert';
        alertBox.className = 'fixed top-4 right-4 p-4 bg-red-600 text-white rounded shadow-lg z-50';
        document.body.appendChild(alertBox);
    }
    alertBox.textContent = `Access Denied for User: ${log.user}, ID: ${log.idNumber}`;

    // Automatically hide alert after 5 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 5000);
}

// Call fetchAndDisplayLogs on dashboard tab activation
document.querySelector('#tab-dashboard').addEventListener('click', fetchAndDisplayLogs);

// Optional: refresh logs every 30 seconds while dashboard is active
let logRefreshInterval;
document.querySelector('#tab-dashboard').addEventListener('click', () => {
    if (logRefreshInterval) clearInterval(logRefreshInterval);
    logRefreshInterval = setInterval(fetchAndDisplayLogs, 30000);
});
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id !== 'tab-dashboard' && logRefreshInterval) {
            clearInterval(logRefreshInterval);
        }
    });
});