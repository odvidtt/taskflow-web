import { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/tasks.js';
import { TaskCard } from './TaskCard.jsx';

export function TaskList({ refresh, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  // Read initial filter from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlStatus = params.get('status');
    if (urlStatus) {
      setStatusFilter(urlStatus);
    }
  }, []);

  const loadTasks = async (filter = statusFilter) => {
    try {
      setLoading(true);
      const params = filter ? { status: filter } : {};
      const data = await getTasks(params);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refresh, statusFilter]);

  const handleStatusChange = (e) => {
    const newFilter = e.target.value;
    setStatusFilter(newFilter);

    const url = new URL(window.location);
    if (newFilter) {
      url.searchParams.set('status', newFilter);
    } else {
      url.searchParams.delete('status');
    }
    window.history.pushState({}, '', url);

    loadTasks(newFilter);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="status-filter">Filter by status: </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={handleDelete} />)
      )}
    </div>
  );
}
