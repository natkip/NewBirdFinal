import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/tasks`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📋 My Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="bg-pink-100 p-2 rounded">
            <strong>{task.title}</strong> — {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
