import React, { useState } from 'react';
import axios from 'axios';

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_BASE}/api/tasks`, {
      title,
      description,
      status: 'To Do',
    }, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <label className="block mb-1 text-sm font-medium">Task Title</label>
      <input
        className="border p-2 w-full rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <label className="block mb-1 text-sm font-medium">Task Description</label>
      <textarea
        className="border p-2 w-full rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button className="bg-pink-500 text-white p-2 w-full rounded hover:bg-pink-600 transition">
        Create Task
      </button>
    </form>
  );
}
