export function websocketConnection() {
	const socket = new WebSocket("ws://localhost:3001"); // Use ws:// for WebSocket

	socket.addEventListener("open", (data) => {
		console.log("open");
	});

	socket.addEventListener("message", updateMessage);
}
