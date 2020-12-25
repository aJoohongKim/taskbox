import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Task, { TaskProps, TaskState } from './Task';

function buildStory(attrs: any) {
    const task = {
      id: Math.round(Math.random() * 1000000).toString(),
      title: 'Test Task',
      subtitle: 'on Test Board',
      url: 'http://test.url',
      state: TaskState.TASK_INBOX,
      updatedAt: Date.now(),
      ...attrs,
    };
    const onPinTask = action('onPinTask');
    const onSnoozeTask = action('onSnoozeTask');
  
    return <Task {...{ task, onPinTask, onSnoozeTask }} />;
  }
  
  storiesOf('Task', module)
    .addDecorator(story => (
      <div className="list-items" style={{ background: 'white' }}>{story()}</div>
    ))
    .add('inbox task', () => buildStory({ state: TaskState.TASK_INBOX }))
    .add('snoozed task', () => buildStory({ state: TaskState.TASK_SNOOZED }))
    .add('pinned task', () => buildStory({ state: TaskState.TASK_PINNED }))
    .add('archived task', () => buildStory({ state: TaskState.TASK_ARCHIVED }));