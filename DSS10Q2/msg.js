let messageQueue = [];

function produceMessage(message) {
    messageQueue.push(message); // add message at the end of the queue
    console.log(`Produced: "${message}"`);
}

function displayQueue() {
    console.log("Current Queue:", messageQueue);
}

function removeMessage() {
    if (messageQueue.length > 0) {
        let msg = messageQueue.shift(); // remove first message
        console.log(`Consumed: "${msg}"`);
    } else {
        console.log("Queue is empty, nothing to consume.");
    }
}
produceMessage("SEND BLOCKCHAIN DATA");
produceMessage("SEND IMAGES OF TOYOTA");
produceMessage("AI CHATGPT");
// Display current queue
displayQueue();
// Consumer takes one message
removeMessage();
// Display queue after consuming
displayQueue();