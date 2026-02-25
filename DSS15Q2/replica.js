// Original store
let original = {
    name: "Sahil",
    subject: "Distributed Systems",
    marks: 95
};
console.log("Original Store:", original);
// Replicate using spread operator
let replica = {...original };
console.log("Replica Store:", replica);
// Update original
original.marks = 90;
// Display after update
console.log("\nAfter updating original:");
console.log("Original Store:", original);
console.log("Replica Store:", replica);