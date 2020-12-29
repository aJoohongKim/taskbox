import React from 'react';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import { PureInboxScreen, PureInboxScreenProp } from './InboxScreen';
import * as TaskListStories from './TaskList.stories';

// A super-simple mock of a redux store
const store: any = {
  getState: () => {
    console.log(TaskListStories.Default.args.tasks);
    return {
      tasks: TaskListStories.Default.args.tasks,
    };
  },
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

export default {
  component: PureInboxScreen,
  decorators: [(story: () => React.ReactNode) => <Provider store={store}>{story()}</Provider>],
  title: 'Cloud-Clipboard/InboxScreen',
};

const Template = (args:PureInboxScreenProp) => <PureInboxScreen {...args} />;

export const Default = Template.bind({});

export const Error: any = Template.bind({});
Error.args = {
  error: 'Something',
};