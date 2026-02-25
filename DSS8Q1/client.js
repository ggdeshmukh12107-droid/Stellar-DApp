const net = require('net');
const client = new net.Socket();
client.connect(9995, '127.0.0.1', () => {
    console.log(" Connected to Divide RPC Server.");
    const request = {
        functionName: "divide",
        args: [100, 20]
    };
    client.write(JSON.stringify(request));
});
client.on('data', (data) => {
    console.log(" Response:", JSON.parse(data.toString()));
    client.end();
});