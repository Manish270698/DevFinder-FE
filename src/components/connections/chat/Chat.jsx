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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const chatContainerRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Fetch messages with pagination
  const fetchChatMessages = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/chat/${params.targetUserId}?page=${pageNum}&limit=20`,
        { withCredentials: true }
      );

      setMessages((prev) => [...data.messages.reverse(), ...prev]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  // Load more messages when scrolling up
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchChatMessages(page + 1);
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

      setMessages((prev) => [...prev, newMessage]);
      sendMessage(input);
      setInput("");
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

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId: params.targetUserId });

    socket.on("messageReceived", ({ senderId, text, timestamp }) => {
      setMessages((prev) => [
        ...prev,
        { text, sender: senderId, messageSentTime: timestamp },
      ]);
    });

    return () => socket.disconnect();
  }, [userId, params.targetUserId]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-[90%] sm:w-3/5 lg:w-1/2 mt-10">
        <div className="border-t-4 border-x-4 w-[100%] border-brand-light p-2 bg-brand rounded-t-md">
          <p className="ml-2 text-brand-light">
            {params.name.split("_").join(" ")}
          </p>
        </div>
        <div className="border-4 border-brand-light h-[70vh] mt-10 rounded-md flex flex-col">
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2 text-brand-light"
            ref={chatContainerRef}
            onScroll={(e) => {
              if (e.target.scrollTop === 0) handleLoadMore();
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === userId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header">
                  {msg.sender === userId ? "You" : params.name}
                  <time className="text-xs opacity-50">
                    {msg.messageSentTime}
                  </time>
                </div>
                <div
                  className={`chat-bubble ${
                    msg.sender === userId
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
