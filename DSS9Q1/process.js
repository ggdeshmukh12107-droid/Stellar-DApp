// p1 hold cpu
// p2 hold ram
// Function for a process to hold a specific resource
function holdResource(process, resource) {
    console.log(`${process} holds ${resource}`);
}

function simulateProcesses() {
    holdResource("P1", "Printer");
    holdResource("P2", "Scanner");
    console.log("Both processes are holding their respective resources.");
}
simulateProcesses();