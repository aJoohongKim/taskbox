import React from 'react';

enum TaskState {
    TASK_INBOX,
    TASK_PINNED,
    TASK_SNOOZED,
    TASK_ARCHIVED,
  }

export interface Task {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    state: TaskState;
}

export interface TaskProps {
    task: Task;
    onSnoozeTask?: () => void;
    onPinTask? : () => void;
}

function Task({
    task: { id, title, url, state, subtitle },
    onSnoozeTask,
    onPinTask,
  }: TaskProps) {
    return (
        <div className="list-item">
          <input type="text" value={title} readOnly={true} />
        </div>
      );
}

export default Task;
