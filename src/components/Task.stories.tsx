import React from 'react';

import Task, { TaskProps, TaskState } from './Task';

export default {
  component: Task,
  title: 'Cloud-Clipboard/Task',
};

const Template = (args: TaskProps) => <Task {...args} />;

export const Default: any= Template.bind({});
Default.args = {
  id: '1',
  title: 'Test Task',
  state: TaskState.TASK_INBOX,
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const Pinned:any = Template.bind({});
Pinned.args = {
  ...Default.args,
  state: TaskState.TASK_PINNED,
};

export const Archived: any = Template.bind({});
Archived.args = {
  ...Default.args,
  state: TaskState.TASK_ARCHIVED,
};