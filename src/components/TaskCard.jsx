const statusColors = {
  todo: '#888',
  in_progress: '#0066cc',
  done: '#00aa00',
};

export function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '12px', borderRadius: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>{task.title}</h3>
          {task.description && <p style={{ margin: '0 0 8px 0', color: '#666' }}>{task.description}</p>}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ color: statusColors[task.status], fontWeight: 'bold', textTransform: 'capitalize' }}>
              {task.status.replace('_', ' ')}
            </span>
            {task.due_date && <span style={{ color: '#999', fontSize: '0.9em' }}>Due: {task.due_date}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onEdit(task)} style={{ padding: '4px 8px', cursor: 'pointer' }}>
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
