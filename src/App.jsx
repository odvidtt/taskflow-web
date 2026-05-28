import { useState } from 'react';
import { TaskForm } from './components/TaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  const handleTaskSubmit = () => {
    setRefresh((prev) => prev + 1);
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>TaskFlow</h1>
      <TaskForm task={editingTask} onSubmit={handleTaskSubmit} onCancel={() => setEditingTask(null)} />
      <TaskList refresh={refresh} onEdit={setEditingTask} />
    </div>
  );
}

export default App;
