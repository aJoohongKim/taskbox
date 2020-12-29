import { Reducer, createStore } from 'redux';

import { TaskProps, TaskState } from '../components/Task';

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};
export const ARCHIVE_TASK = 'ARCHIVE_TASK';
export const PIN_TASK = 'PIN_TASK';


interface ArchiveTaskAction {
    type: typeof actions.ARCHIVE_TASK
    id: string
}

interface PinTaskAction {
    type: typeof actions.PIN_TASK
    id: string
}

type TASK_TYPES = typeof actions.ARCHIVE_TASK | typeof actions.PIN_TASK;
console.log(typeof actions.ARCHIVE_TASK);
console.log(typeof actions.PIN_TASK);


export interface TasksState {
    tasks: TaskProps[]
}

export type TaskActionTypes = ArchiveTaskAction | PinTaskAction;

// The action creators bundle actions with the data required to execute them
export const archiveTask = (id: string): ArchiveTaskAction => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id:string): PinTaskAction => ({ type: actions.PIN_TASK, id });

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState: TaskState) {
  return (state: TasksState, action: TaskActionTypes) => {
    return {
        ...state,
        tasks: state.tasks.map(task => 
            task.id === action.id ? { ...task, state: taskState } : task
        )
    } as TasksState;
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer: Reducer<TasksState, TaskActionTypes> = (state = {tasks: defaultTasks}, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer(TaskState.TASK_ARCHIVED)(state, action);
    case actions.PIN_TASK:
      return taskStateReducer(TaskState.TASK_PINNED)(state, action);
    default:
      return state;
  }
};


// const archiveReducer = reducer(actions.ARCHIVE_TASK,)

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks: TaskProps[] = [
  { id: '1', title: 'Something', state: TaskState.TASK_INBOX },
  { id: '2', title: 'Something more', state: TaskState.TASK_INBOX },
  { id: '3', title: 'Something else', state: TaskState.TASK_INBOX },
  { id: '4', title: 'Something again', state: TaskState.TASK_INBOX },
];

function taskArchiveReducer(state: TasksState = {tasks: defaultTasks}, action: TaskActionTypes) {
    // return state;
    return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? { ...task, state: action.type } : task
        )
    } as TasksState;
}
type RootState = ReturnType<typeof reducer>

// We export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });
// export default createStore(reducer);