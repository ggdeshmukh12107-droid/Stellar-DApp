const net = require('net');

function divide(a, b) {
    return b !== 0 ? a / b : "Error: Division by zero";
}
const functions = { divide };
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const req = JSON.parse(data.toString());
        const result = functions[req.functionName](...req.args);
        socket.write(JSON.stringify({ status: "success", result }));
    });
});
server.listen(9995, '127.0.0.1', () =>
    console.log(" RPC Divide Server running on 127.0.0.1:9995")
);