import { SET_CURRENT_USER } from './actionTypes';

const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

export { setCurrentUser as default };
