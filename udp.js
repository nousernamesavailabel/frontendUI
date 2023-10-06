//opens UDP2260 on all local addresses, grabs remote IP and port from js8 when it connects and sends TX.SET_TEXT, "HELLO" to set the tx text. Runs locally in javascript. 
const dgram = require('dgram');
const udpServer = dgram.createSocket('udp4');

let isFirstMessage = true; // Flag to track the first message

// Create a UDP server that listens for incoming messages
udpServer.on('message', (message, remote) => {
    console.log(`Received message from ${remote.address}:${remote.port}: ${message}`);

    if (isFirstMessage) {
        // Prepare the JSON response
        const response = {
            type: 'TX.SET_TEXT',
            value: 'HELLO',
            params: Date.now(), // Timestamp in milliseconds
        };

        // Convert the response object to JSON
        const jsonResponse = JSON.stringify(response);

        // Send the response back to the remote IP and port
        udpServer.send(jsonResponse, 0, jsonResponse.length, remote.port, remote.address, (err) => {
            if (err) {
                console.error('Error sending UDP response:', err);
            } else {
                console.log(`Sent response to ${remote.address}:${remote.port}: ${jsonResponse}`);
            }
        });

        isFirstMessage = false; // Set the flag to false after sending the response
    }
    // Process the incoming message as needed
});

// Start the UDP server and listen on a specific port
udpServer.bind(2260, '0.0.0.0', () => {
    console.log('UDP server is listening on port 2260');
});

// Function to send a UDP message to a specific host and port
function sendUDPMessage(host, port, message) {
    const udpClient = dgram.createSocket('udp4');
    udpClient.send(message, 0, message.length, port, host, (err) => {
        if (err) {
            console.error('Error sending UDP message:', err);
        } else {
            console.log(`Sent message to ${host}:${port}: ${message}`);
        }
        udpClient.close();
    });
}

// Example usage
//sendUDPMessage('127.0.0.1', 2260, 'Hello, UDP server!');
