import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import KanbanBoard from '../components/KanbanBoard';
import AIChatbox from '../components/AIChatbox';
const token = localStorage.getItem('token');

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/tasks`, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log('Tasks loaded:', tasks);
  }, [tasks]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Navbar handleLogout={handleLogout} />
        <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-4">
          <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
            Welcome to BirdieBot!
          </h1>
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} token={token} />
          <KanbanBoard tasks={tasks} fetchTasks={fetchTasks} />
          <AIChatbox fetchTasks={fetchTasks} />
        </div>
      </div>
    </div>
  );
}
