import { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/tasks.js';
import { TaskCard } from './TaskCard.jsx';

export function TaskList({ refresh, onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
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
  }, [refresh]);

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
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={handleDelete} />)
      )}
    </div>
  );
}
