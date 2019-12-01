import { SET_CURRENT_USER, LOG_USER } from './actionTypes';

const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

const logUser = (params) => ({
  type: LOG_USER,
  params,
});

export { logUser, setCurrentUser as default };
