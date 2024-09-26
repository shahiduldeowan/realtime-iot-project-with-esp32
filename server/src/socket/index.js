
const initializeSocket = (io) => {
  return io.on("connection", async (socket) => {
    try {
      socket.emit("connected");
      console.log("User connected 🔗.");

      socket.on("disconnect", () => {
        console.log("User has disconnected 🚫.");
      });
    } catch (error) {
      socket.emit("error", error?.message || "Something went wrong while connecting to the socket");
    }
  });
};

const emitSocketEvent = (req, event, payload) => {
  req.app.get(
    "io"
  )
    .emit(event, payload);
};

export { emitSocketEvent, initializeSocket };

