export default function MessageBubble({ msg, currentUserId }) {
  const isOwn = msg.sender === currentUserId;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
