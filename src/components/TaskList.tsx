import React from 'react';
import { connect } from 'react-redux';

import { archiveTask, pinTask, TasksState } from '../lib/redux';
import Task, { TaskProps, TaskState } from './Task';

export interface TaskListProps {
    loading: boolean;
    tasks: TaskProps[];
    onArchiveTask?: (id: string) => void;
    onPinTask? : (id: string) => void;
}

export function TaskList({ loading, tasks, onPinTask, onArchiveTask }: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };
  
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
        <div className="list-items">
          {LoadingRow}
          {LoadingRow}
          {LoadingRow}
          {LoadingRow}
          {LoadingRow}
          {LoadingRow}
        </div>
      );
  }

  if (tasks.length === 0) {
    return (
        <div className="list-items">
          <div className="wrapper-message">
            <span className="icon-check" />
            <div className="title-message">You have no tasks</div>
            <div className="subtitle-message">Sit back and relax</div>
          </div>
        </div>
      );
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === TaskState.TASK_PINNED),
    ...tasks.filter(t => t.state !== TaskState.TASK_PINNED),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map(task => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
}

export default connect(
  ({ tasks }: TasksState) => ({
    tasks: tasks.filter(t => t.state === TaskState.TASK_INBOX || t.state === TaskState.TASK_PINNED),
  }),
  dispatch => ({
    onArchiveTask: (id: string) => dispatch(archiveTask(id)),
    onPinTask: (id: string) => dispatch(pinTask(id)),
  })
)(TaskList);
