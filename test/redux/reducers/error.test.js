import errorReducer from '../../../redux/reducers/error';
import { SET_ERROR } from '../../../redux/actions/actionTypes';

const dummyError = {
  message: 'Something went wrong',
};

describe('errorReducer', () => {
  describe('action type is not SET_ERROR', () => {
    it('returns null state', () => {
      const action = {
        type: 'SOME_ACTION',
      };
      expect(errorReducer(null, action)).toEqual(null);
    });
  });

  describe('action type is SET_ERROR', () => {
    it('returns the error object', () => {
      const action = {
        type: SET_ERROR,
        error: dummyError,
      };

      expect(errorReducer(null, action)).toEqual(dummyError);
    });
  });
});
