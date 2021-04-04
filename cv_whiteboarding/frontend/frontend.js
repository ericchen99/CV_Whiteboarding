/**
 * Creates a unix socket server and waits for a python client to interact
 */
let socket = new WebSocket(socketPath);

socket.onopen = function (event) {
    socket.send("Here's some text that the server is urgently awaiting!");
};

socket.onmessage = function (event) {
    console.log(event.data);
}

socket.close();
