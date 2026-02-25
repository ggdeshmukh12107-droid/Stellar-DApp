const net = require("net");
const server = net.createServer((socket) => {
    console.log("Welcome Client"); // printed when client connects
});
server.listen(5000, () => {
    console.log("Server running on port 5000...");
});