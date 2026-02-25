const net = require("net");
const server = net.createServer((socket) => {
    console.log("Client connected!");
    socket.on("data", (data) => {
        console.log("Received from client:", data.toString());
    });
});
server.listen(5000, () => {
    console.log("Server is running on port 5000...");
});