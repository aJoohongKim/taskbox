import React from 'react';

export enum TaskState {
  TASK_INBOX,
  TASK_PINNED,
  TASK_SNOOZED,
  TASK_ARCHIVED,
}

// export interface ITask {
//   id: string;
//   title: string;
//   subtitle?: string;
//   url?: string;
//   state: TaskState;
//   updatedAt: Date;
// }

export interface TaskProps {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  state: TaskState;
  updatedAt?: Date;
  onArchiveTask?: (id: string) => void;
  onPinTask? : (id: string) => void;
}

export default function Task({ id, title, state, onArchiveTask, onPinTask }: TaskProps) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === TaskState.TASK_ARCHIVED}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask && onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== TaskState.TASK_ARCHIVED && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask && onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}