import actions from './actions.type';

export default {
  todoCreate: (payload) => ({
    type: actions.TODO_CREATE,
    payload,
  }),
  todoUpdate: (payload) => ({
    type: actions.TODO_UPDATE,
    payload,
  }),
  todoDelete: (payload) => ({
    type: actions.TODO_DELETE,
    payload,
  }),
};
