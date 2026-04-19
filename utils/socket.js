let io;

const initSocket = (server) => {
    const { Server } = require("socket.io");

    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        console.log("Connected:", socket.id);

        socket.on("send_message", (data) => {
            io.emit("receive_message", data);
        });
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket not initialized");
    return io;
};

module.exports = { initSocket, getIO };