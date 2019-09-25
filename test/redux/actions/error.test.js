import { SET_ERROR } from '../../../redux/actions/actionTypes';
import setError from '../../../redux/actions/error';

describe('setError action creator', () => {
  it('returns the right action', () => {
    const error = { message: 'Cannot do anything' };
    expect(setError(error)).toEqual({
      type: SET_ERROR,
      error,
    });
  });
});
