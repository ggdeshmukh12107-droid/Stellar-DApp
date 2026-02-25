const net = require('net');

function percentage(marks, total) {
    return (marks / total) * 100;
}
const functions = { percentage };

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const req = JSON.parse(data.toString());
        const result = functions[req.functionName](...req.args);
        socket.write(JSON.stringify({ status: "success", result }));
    });
});
server.listen(9996, '127.0.0.1', () =>
    console.log(" RPC Percentage Server running on 127.0.0.1:9996")
);