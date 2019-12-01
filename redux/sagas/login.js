import { put, takeEvery, call } from 'redux-saga/effects';
import { LOG_USER } from '../actions/actionTypes';
import setCurrentUser from '../actions/currentUser';
import setError from '../actions/error';
import { sendRequest, setAuthorizationToken } from '../../services/api';
import { setCookie } from '../../services/cookie';

function* setUpCurrenUser(user) {
  yield setCookie('token', user.token);
  yield setAuthorizationToken(user.token);
  yield put(setCurrentUser({
    authenticated: true,
    data: user,
  }));
}

function* setupError(error) {
  if (error.message.includes('401')) {
    yield put(setError('Invalid credentials'));
  } else {
    yield put(setError(error.message));
  }
}

function* login(params) {
  const path = 'v1/sessions';
  try {
    const response = yield sendRequest('post', path, params);
    const user = yield response.data;
    yield call(setUpCurrenUser, user);
    yield put(setError(null));
    return user;
  } catch (err) {
    yield put(setCurrentUser({
      authenticated: false,
      data: null,
    }));

    return yield call(setupError, err);
  }
}

export default function* watchLogin() {
  yield takeEvery(LOG_USER, login);
}
