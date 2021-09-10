import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import authSagas from './auth/sagas';

import todo from './todo';
import todoSagas from './todo/sagas';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
  ]);
}

const middlewares = applyMiddleware(sagaMiddleware);
const devTools = process.env.NODE_ENV === 'production' ? middlewares : composeWithDevTools(middlewares);

export default createStore(
  combineReducers({
    auth,
    todo,
  }),
  devTools,
);

sagaMiddleware.run(rootSaga);
