import React, { useState } from 'react';

export default function InboxPage() {
  const [messages] = useState([
    { id: 1, text: 'Welcome to BirdieTask! 🎉' },
    { id: 2, text: 'You have 3 tasks pending in To Do.' },
    { id: 3, text: 'AI Assistant suggested a new high-priority task.' },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📥 Inbox</h2>
      <ul className="space-y-2">
        {messages.map((msg) => (
          <li key={msg.id} className="bg-pink-100 p-2 rounded">
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
