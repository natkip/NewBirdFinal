import React, { useState } from 'react';
import axios from 'axios';

export default function AIChatbox({ fetchTasks }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post(
        `${API_BASE}/api/ai/suggest`,
        { title: input },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setResponse(res.data);
    } catch (err) {
      console.error('AI suggestion failed', err);
      setResponse({ error: 'Failed to get suggestion' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!response) return;
    try {
      await axios.post(`${API_BASE}/api/tasks`, {
        title: input,
        description: '',
        priority: response.priority,
        dueDate: response.dueDate,
        status: 'To Do', // explicitly set status
      }, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      if (fetchTasks) fetchTasks();
      setInput('');
      setResponse(null);
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded shadow-lg w-72 p-3">
      <h4 className="font-bold mb-2 text-pink-600">AI Task Assistant</h4>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Describe your task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Get Suggestion'}
        </button>
      </form>
      {response && (
        <div className="mt-3 text-sm">
          {response.error ? (
            <p className="text-red-500">{response.error}</p>
          ) : (
            <>
              <p><strong>Priority:</strong> {response.priority}</p>
              <p><strong>Due Date:</strong> {new Date(response.dueDate).toLocaleDateString()}</p>
              <button
                onClick={handleSave}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition w-full"
              >
                Save as Task
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
