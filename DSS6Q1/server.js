const net = require('net');

function multiply(a, b) {
    return a * b;
}
const functions = { multiply };
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const r = JSON.parse(data.toString());
        const result = functions[r.functionName](...r.args);
        socket.write(JSON.stringify({ status: "success", result }));
    });
});
server.listen(9997, '127.0.0.1', () =>
    console.log(" RPC Multiply Server running on 127.0.0.1:9997")
);