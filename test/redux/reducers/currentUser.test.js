import currentUserReducer from '../../../redux/reducers/currentUser';
import { SET_CURRENT_USER } from '../../../redux/actions/actionTypes';

const dummyUser = {
  id: 'someId',
  username: 'user123',
  email: 'example@gmail.com',
  first_name: 'Not nice',
};

describe('currentUserReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      authenticated: false,
      data: null,
    };
  });

  describe('action type is not SET_ERROR', () => {
    const action = {
      type: 'ANOTHER_ACTION',
      data: 'nothing',
    };
    it('returns the initialState', () => {
      expect(currentUserReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('action type is SET_ERROR', () => {
    it('returns the new current user', () => {
      const action = {
        type: SET_CURRENT_USER,
        currentUser: dummyUser,
      };

      expect(currentUserReducer(initialState, action)).toEqual(dummyUser);
    });
  });
});
