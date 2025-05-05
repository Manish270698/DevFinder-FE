import React, { useState, useRef, useEffect } from "react";
import { createSocketConnection } from "../../../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const Chat = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Fetch messages from the database
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${params.targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages?.map((message) => ({
        text: message?.text,
        sender: message?.senderId?._id,
        messageSentTime: message?.createdAt,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  // Optimistically update UI before sending message
  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: userId,
        messageSentTime: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]); // Instantly show message
      sendMessage(input); // Send to server
      setInput(""); // Clear input field
    }
  };

  // Sending message via Socket.io
  const sendMessage = (messageText) => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId: params.targetUserId,
      text: messageText,
      timestamp: new Date().toISOString(),
    });
  };

  // Format timestamp to match WhatsApp-style display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      date.toDateString();
    const isSameYear = year === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else if (isSameYear) {
      return `${day} ${month}`;
    } else {
      return `${day} ${month} ${year}`;
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetUserId: params.targetUserId });

    socket.on("messageReceived", ({ senderId, text, timestamp }) => {
      if (senderId !== userId)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text, sender: senderId, messageSentTime: timestamp },
        ]);
    });

    return () => socket.disconnect();
  }, [userId, params.targetUserId]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="absolute w-[90%] sm:w-3/5 lg:w-1/2 mt-10">
        <div className="border-t-4 absolute top-0 border-x-4 w-[100%] border-brand-light p-2 bg-brand rounded-t-md">
          <p className="ml-2 text-brand-light">
            {params.name.split("_").join(" ")}
          </p>
        </div>
        <div className="border-4 border-brand-light h-[70vh] mt-10 rounded-md flex flex-col">
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2 text-brand-light"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === userId ? "chat-end" : "chat-start"
                } `}
              >
                <div className="chat-header">
                  {msg.sender === userId
                    ? "You"
                    : msg.sender === params.targetUserId
                    ? params.name.split("_").join(" ").length <= 15
                      ? params.name.split("_").join(" ")
                      : params.name.split("_").join(" ").substring(0, 12) +
                        "..."
                    : ""}
                  <time className="text-xs opacity-50">
                    {formatTimestamp(msg.messageSentTime)}
                  </time>
                </div>
                <div
                  className={`chat-bubble break-words ${
                    msg.sender === userId
                      ? "bg-[#25D366] text-white"
                      : "bg-white text-black border border-gray-300"
                  }`}
                >
                  {msg.text
                    .trim()
                    .split("\n")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < msg.text.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-4 border-brand-light p-2 lg:p-3 flex bg-brand rounded-b-md">
            <textarea
              className="block border-2 p-2 max-h-12 flex-1 text-brand-light border-brand-light rounded-md bg-gradient-white focus:outline-none resize-none"
              name="message"
              type="text"
              value={input}
              placeholder="Write your message"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-brand-sendMessage hover:bg-brand-message"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
