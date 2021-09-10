import { put, select, takeLatest } from 'redux-saga/effects';
import types from './actions.type';
import { todoTaskList } from './selectors';

function* workerUpdateLocalStorage() {
  const todoList = yield select(todoTaskList);
  localStorage.setItem('tbg-todo-list', JSON.stringify(todoList));
  yield put({ type: types.TODO_LOCAL_STORAGE_UPDATED });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Watchers ~~~ */

export default function* watcherAuth() {
  yield takeLatest(types.TODO_CREATE, workerUpdateLocalStorage);
  yield takeLatest(types.TODO_UPDATE, workerUpdateLocalStorage);
  yield takeLatest(types.TODO_DELETE, workerUpdateLocalStorage);
}
