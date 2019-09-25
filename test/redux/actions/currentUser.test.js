import { SET_CURRENT_USER } from '../../../redux/actions/actionTypes';
import setCurrentUser from '../../../redux/actions/currentUser';

const dummyUser = {
  id: 'someId',
  username: 'user123',
  email: 'example@gmail.com',
  first_name: 'Not nice',
};

describe('setCurrentUser action creator', () => {
  it('returns the right action', () => {
    expect(setCurrentUser(dummyUser)).toEqual({
      type: SET_CURRENT_USER,
      currentUser: dummyUser,
    });
  });
});
