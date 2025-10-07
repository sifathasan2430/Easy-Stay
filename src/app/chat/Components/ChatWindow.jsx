"use client";

import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ conversation, onBack }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef();

  const userId = "yourUserId";

  useEffect(() => {
    if (conversation?._id) {
      fetch(`/api/messages/${conversation._id}`)
        .then((res) => res.json())
        .then(setMessages);
    }
  }, [conversation]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const newMsg = {
      sender: userId,
      receiver: conversation.participants.find((p) => p._id !== userId)._id,
      text,
    };
    setText("");
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMsg),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, data.message]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="md:hidden">
              ←
            </button>
          )}
          <h2 className="font-semibold text-lg">
            {
              conversation.participants.find((p) => p._id !== userId)?.name ||
              "Chat"
            }
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} currentUserId={userId} />
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
