import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-pink-200 w-48 min-h-screen p-4">
      <button
        onClick={() => navigate('/dashboard')}
        className="block w-full text-left mb-2 hover:bg-pink-300 p-2 rounded"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate('/inbox')}
        className="block w-full text-left mb-2 hover:bg-pink-300 p-2 rounded"
      >
        Inbox
      </button>
      <button
        onClick={() => navigate('/tasks')}
        className="block w-full text-left mb-2 hover:bg-pink-300 p-2 rounded"
      >
        Tasks
      </button>
      <button
        onClick={() => navigate('/settings')}
        className="block w-full text-left mb-2 hover:bg-pink-300 p-2 rounded"
      >
        Settings
      </button>
    </div>
  );
}

