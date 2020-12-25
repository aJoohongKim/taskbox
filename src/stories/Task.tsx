import React from 'react';

const alignStyles = {
  fontSize: '14px',
  lineHeight: '1.5rem',
  padding: '0.75em 0.25em',
};

enum TaskState {
    TASK_INBOX,
    TASK_PINNED,
    TASK_SNOOZED,
    TASK_ARCHIVED,
  }

export interface ITask {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    state: TaskState;
}

export interface TaskProps {
    task: ITask;
    onSnoozeTask?: (id: string) => void;
    onPinTask? : (id: string) => void;
}

function Task({
    task: { id, title, url, state, subtitle },
    onSnoozeTask,
    onPinTask,
  }: TaskProps) {
    return (
      <div className="list-item">
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === TaskState.TASK_ARCHIVED}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" />
      </label>
      <input
        type="text"
        value={title}
        readOnly={true}
        placeholder="Input title"
        onClick={() => window.open(url, '_new')}
      />
      {subtitle &&
        <p style={{ flex: 1, color: '#666', ...alignStyles }}>{subtitle}</p>}
      {state !== TaskState.TASK_SNOOZED &&
        state !== TaskState.TASK_ARCHIVED &&
        <a style={alignStyles} onClick={() => onSnoozeTask(id)}>
          <span className="icon-link icon-sync" />
        </a>}
      {state !== TaskState.TASK_PINNED &&
        <a style={alignStyles} onClick={() => onPinTask(id)}>
          <span className="icon-link icon-arrow-down" />
        </a>}
    </div>
      );
}

export default Task;
