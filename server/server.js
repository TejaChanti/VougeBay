const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const ChatMessage = require("./models/ChatMessage");
const connectDB = require("./config/db");
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Socket.IO Chat Logic
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_room", async (roomId) => {
    socket.join(roomId);
    const messages = await ChatMessage.find({ chatRoom: roomId }).sort(
      "createdAt"
    );
    socket.emit("chat_history", messages);
  });

  socket.on("send_message", async (data) => {
    const newMessage = new ChatMessage(data);
    await newMessage.save();
    io.to(data.chatRoom).emit("receive_message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
