const net = require('net');
const client = new net.Socket();
client.connect(9994, '127.0.0.1', () => {
    console.log(" Connected to Average RPC Server.");
    const request = {
        functionName: "avg",
        args: [20, 30, 40]
    };
    client.write(JSON.stringify(request));
});
client.on('data', (data) => {
    console.log(" Response:", JSON.parse(data.toString()));
    client.end();
});