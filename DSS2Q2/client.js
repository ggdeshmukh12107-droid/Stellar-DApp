const net = require('net');
const client = new net.Socket();
client.connect(9996, '127.0.0.1', () => {
    console.log(" Connected to Percentage RPC Server.");
    const request = {
        functionName: "percentage",
        args: [45, 50]
    };
    client.write(JSON.stringify(request));
});
client.on('data', (data) => {
    console.log(" Response:", JSON.parse(data.toString()));
    client.end();
});