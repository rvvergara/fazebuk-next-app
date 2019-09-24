import { SET_ERROR } from './actionTypes';

const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export { setError as default };
