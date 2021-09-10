import types from './actions.type';
import initData from './initData';

const rawTaskList = localStorage.getItem('tbg-todo-list');
const taskList = (rawTaskList) ? JSON.parse(rawTaskList) : initData;

const initialState = {
  taskList,
};

export default (state = initialState, action) => {
  let number;
  switch (action.type) {
    case types.TODO_CREATE:
      number = state.taskList.map((task) => task.number);
      number = (number.length > 0)
        ? Math.max.apply(null, number) + 1
        : 1;
      return {
        ...state,
        taskList: [...state.taskList, { number, ...action.payload }],
      };
    case types.TODO_UPDATE:
      return {
        ...state,
        taskList: state.taskList.map((task) => ((task.number === action.payload.number)
          ? { ...task, ...action.payload }
          : task)),
      };
    case types.TODO_DELETE:
      return {
        ...state,
        taskList: state.taskList.filter((task) => (task.number !== action.payload)),
      };
    default:
      return state;
  }
};
