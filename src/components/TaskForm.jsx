import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/tasks.js';

export function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'todo',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (task?.id) {
        await updateTask(task.id, formData);
      } else {
        await createTask(formData);
      }
      onSubmit();
      setFormData({ title: '', description: '', due_date: '', status: 'todo' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '12px', border: '1px solid #ccc', marginBottom: '12px', borderRadius: '4px' }}>
      <h3>{task?.id ? 'Edit Task' : 'New Task'}</h3>
      {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}

      <div style={{ marginBottom: '8px' }}>
        <label>
          Title *
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ marginLeft: '8px', padding: '4px', width: '100%', maxWidth: '300px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ marginLeft: '8px', padding: '4px', width: '100%', maxWidth: '300px', minHeight: '60px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label>
          Due Date
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            style={{ marginLeft: '8px', padding: '4px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange} style={{ marginLeft: '8px', padding: '4px' }}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {task?.id ? 'Update' : 'Create'}
        </button>
        {task?.id && (
          <button type="button" onClick={onCancel} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
