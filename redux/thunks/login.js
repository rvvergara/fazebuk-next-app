import setCurrentUser from '../actions/currentUser';
import setError from '../actions/error';
import { sendRequest, setAuthorizationToken } from '../../services/api';
import { setCookie } from '../../services/cookie';

const setupCurrentUser = (user, dispatch) => {
  setCookie('token', user.token);
  setAuthorizationToken(user.token);
  dispatch(setCurrentUser({ authenticated: true, data: user }));
};

const setupError = (error, dispatch) => {
  if (error.message.includes('401')) {
    dispatch(setError('Invalid credentials'));
  } else {
    dispatch(setError(error.message));
  }
};

const login = params => async (dispatch) => {
  const path = 'v1/sessions';

  try {
    const response = await sendRequest('post', path, params);
    const user = response.data;
    setupCurrentUser(user, dispatch);
    dispatch(setError(null));
    return Promise.resolve('Successful login');
  } catch (error) {
    dispatch(setCurrentUser({ authenticated: false, data: null }));
    setupError(error, dispatch);
    return error;
  }
};

export { login as default };
