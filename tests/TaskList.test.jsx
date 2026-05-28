import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskList } from '../src/components/TaskList.jsx';

vi.mock('../src/api/tasks.js', () => ({
  getTasks: vi.fn(() => Promise.resolve([
    { id: 1, title: 'Task 1', status: 'todo', description: '', due_date: '' },
    { id: 2, title: 'Task 2', status: 'done', description: '', due_date: '' },
  ])),
  deleteTask: vi.fn(),
}));

describe('TaskList', () => {
  it('should render tasks', async () => {
    render(<TaskList refresh={0} onEdit={vi.fn()} />);
    expect(await screen.findByText('Task 1')).toBeDefined();
    expect(screen.getByText('Task 2')).toBeDefined();
  });

  it('should render task count', async () => {
    render(<TaskList refresh={0} onEdit={vi.fn()} />);
    expect(await screen.findByText(/Tasks \(2\)/)).toBeDefined();
  });
});
