import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Clear the saved token
    navigate('/login');               // ✅ Redirect to the login page
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-pink-500 text-white shadow">
      <div className="flex items-center space-x-3">
        <img src="/birdie.png" alt="Bird" className="w-8 h-8" />
        <span className="text-lg font-bold">BirdieTask</span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-pink-500 px-4 py-1 rounded hover:bg-pink-100 transition"
      >
        Logout
      </button>
    </div>
  );
}
