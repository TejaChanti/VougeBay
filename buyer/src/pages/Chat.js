import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const fetchUserAndRoom = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        const buyer = res.data;
        setBuyerId(buyer.id);

        const seller = "SELLER_OBJECT_ID_HERE";
        setSellerId(seller);

        const room = [buyer.id, seller].sort().join("-");
        setRoomId(room);

        socket.emit("join_room", room);
        socket.on("chat_history", (history) => {
          setMessages(history);
        });
        socket.on("receive_message", (msg) => {
          setMessages((prev) => [...prev, msg]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserAndRoom();
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!newMsg) return;
    const messageData = {
      sender: buyerId,
      recipient: sellerId,
      content: newMsg,
      chatRoom: roomId,
    };
    socket.emit("send_message", messageData);
    setNewMsg("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-[5rem]">
      <h1 className="text-2xl font-bold mb-4">Chat with Seller</h1>
      <div className="border h-96 overflow-y-scroll p-4 rounded mb-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`my-2 p-2 rounded ${
              msg.sender === buyerId
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100"
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded text-red-600 bg-white-500 border border-red-500 font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
