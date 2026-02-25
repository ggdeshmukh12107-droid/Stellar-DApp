const net = require('net');

function avg(a, b, c) {
    return (a + b + c) / 3;
}
const functions = { avg };
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const req = JSON.parse(data.toString());
        const result = functions[req.functionName](...req.args);
        socket.write(JSON.stringify({ status: "success", result }));
    });
});
server.listen(9994, '127.0.0.1', () =>
    console.log(" RPC Avg Server running on 127.0.0.1:9994")
);