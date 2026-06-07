import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from '../src/components/TaskForm.jsx';

vi.mock('../src/api/tasks.js', () => ({
  createTask: vi.fn(() => Promise.resolve({})),
  updateTask: vi.fn(() => Promise.resolve({})),
}));

describe('TaskForm', () => {
  it('should render form with empty title', () => {
    render(<TaskForm task={null} onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText('New Task')).toBeDefined();
  });

  it('should render status options', () => {
    render(<TaskForm task={null} onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByRole('combobox', { name: /status/i }).value).toBe('todo');
  });

  it('should have a create button', () => {
    render(<TaskForm task={null} onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByText('Create')).toBeDefined();
  });
});
