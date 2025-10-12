"use client";

import { useEffect, useState } from "react";

export default function ConversationList({ onSelect }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const userId = "yourUserId"; // replace with auth user
    fetch(`/api/conversations/${userId}`)
      .then((res) => res.json())
      .then(setConversations);
  }, []);

  return (
    <div className="w-full p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      {conversations.map((conv) => {
        const partner = conv.participants.find(
          (p) => p._id !== "yourUserId"
        );
        return (
          <button
            key={conv._id}
            onClick={() => onSelect(conv)}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <img
              src={partner?.profileImage || "/default-avatar.png"}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="text-left">
              <p className="font-medium">{partner?.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
