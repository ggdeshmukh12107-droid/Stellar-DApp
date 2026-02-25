function findLeader(processIDs) {

    let leader = Math.max(...processIDs);

    console.log("Process IDs:", processIDs);

    console.log("The Leader is Process with ID:", leader);
}
let processList = [10, 25, 7, 30, 15];
findLeader(processList);