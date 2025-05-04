import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [user, setUser] = useState(null);
  const API_BASE = process.env.REACT_APP_API_BASE;

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleNotifications = () => {
    setNotifications((prev) => !prev);
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : ''}`}>
      <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>

      {/* Theme toggle */}
      <div className="mb-4">
        <h3 className="font-semibold">Theme</h3>
        <button
          onClick={toggleTheme}
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition mt-1"
        >
          Toggle Theme ({theme})
        </button>
      </div>

      {/* Notifications toggle */}
      <div className="mb-4">
        <h3 className="font-semibold">Notifications</h3>
        <button
          onClick={toggleNotifications}
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition mt-1"
        >
          {notifications ? 'Disable Notifications' : 'Enable Notifications'}
        </button>
      </div>

      {/* User profile */}
      <div className="mb-4">
        <h3 className="font-semibold">User Profile</h3>
        {user ? (
          <div className="mt-1">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user._id}</p>
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </div>
  );
}
