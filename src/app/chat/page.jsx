"use client";

import { useState, useEffect } from "react";
import ConversationList from "./components/ConversationList";
import ChatWindow from "./components/ChatWindow";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-1/3 border-r bg-white dark:bg-gray-900">
        <ConversationList onSelect={setSelectedConversation} />
      </aside>

      {/* Mobile Sidebar (toggleable) */}
      <div className="md:hidden">
        {!selectedConversation ? (
          <ConversationList onSelect={setSelectedConversation} />
        ) : (
          <ChatWindow
            conversation={selectedConversation}
            onBack={() => setSelectedConversation(null)}
          />
        )}
      </div>

      {/* Chat Area */}
      <main className="flex-1 hidden md:flex flex-col bg-gray-50 dark:bg-gray-800">
        {selectedConversation ? (
          <ChatWindow conversation={selectedConversation} />
        ) : (
          <div className="flex items-center justify-center text-gray-400">
            Select a conversation
          </div>
        )}
      </main>
    </div>
  );
}
