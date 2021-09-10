import { put, takeLatest } from 'redux-saga/effects';
import types from './actions.type';

function* workerSignIn({ payload }) {
  localStorage.setItem('tbg-user-id', payload);
  yield put({ type: types.AUTH_SIGN_IN_SUCCEEDED });
}

function* workerSignOut() {
  localStorage.removeItem('tbg-user-id');
  yield put({ type: types.AUTH_SIGN_OUT_SUCCEEDED });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Watchers ~~~ */

export default function* watcherAuth() {
  yield takeLatest(types.AUTH_SIGN_IN, workerSignIn);
  yield takeLatest(types.AUTH_SIGN_OUT, workerSignOut);
}
