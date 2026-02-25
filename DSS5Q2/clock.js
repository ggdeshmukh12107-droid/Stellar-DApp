// subtracting seconds from that value.

let clock = {
    server: 15000,
    node1: 3000,
    node2: 8000,
    node3: 45000,
    node4: 7800
};

function ToSee(label, clockObj) {
    console.log("\n" + label);
    for (const [name, time] of Object.entries(clockObj)) {
        console.log(`${name}: ${time}`);
    }
}

ToSee("initial time is", clock);
const timeValues = Object.values(clock);
const avg = timeValues.reduce((sum, val) => sum + val, 0) / timeValues.length;
const adjustment = {};
for (const [name, time] of Object.entries(clock)) {
    adjustment[name] = avg - time;
}
for (const [name, adjust] of Object.entries(adjustment)) {
    clock[name] += adjust;
}
ToSee("new avg time is", clock);
console.log("\nCalculated average:", avg);