const net = require("net");
const client = net.createConnection({ port: 5000 }, () => {
    console.log("Client connected to server");
});