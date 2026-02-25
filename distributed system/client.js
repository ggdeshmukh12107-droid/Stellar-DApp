const net = require("net");

// Connect to the server
const client = net.createConnection({ port: 5000 }, () => {
    console.log("Connected to server!");

    // Send message to the server
    client.write("Hello Server");
})