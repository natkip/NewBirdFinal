import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AIChatbox from './components/AIChatbox';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import InboxPage from './pages/InboxPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';

function Logout() {
  localStorage.removeItem('token');
  return <Navigate to="/" replace />;
}

function NotFound() {
  return <div className="text-center p-10 text-2xl text-pink-600">404 - Page Not Found</div>;
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-6 bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <AIChatbox />
          </div>
        </div>
      </div>
    </Router>
  );
}