import { useState, useEffect } from 'react';
import { TaskForm } from './components/TaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('status') || 'All';
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (statusFilter === 'All') {
      params.delete('status');
    } else {
      params.set('status', statusFilter);
    }
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [statusFilter]);

  const handleTaskSubmit = () => {
    setRefresh((prev) => prev + 1);
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>TaskFlow</h1>
      <TaskForm task={editingTask} onSubmit={handleTaskSubmit} onCancel={() => setEditingTask(null)} />
      <TaskList refresh={refresh} onEdit={setEditingTask} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />
    </div>
  );
}

export default App;
