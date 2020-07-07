import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from '../../../__mocks__/axios';
import login from '../../../redux/thunks/login';

const createMockStore = configureMockStore([thunk]);

const initialCurrentUser = {
  authenticated: false,
  data: null,
};

const validParams = { email: 'valid@email.com', password: 'password' };

const dummyUser = {
  first_name: 'John',
  last_name: 'Doe',
  token: 'someToken1234',
};

const types = ['SET_CURRENT_USER', 'SET_ERROR'];

describe('login function', () => {
  let store;

  beforeEach(() => {
    store = createMockStore({ currentUser: initialCurrentUser });
  });
  describe('valid params', () => {
    let actions;
    beforeEach(async () => {
      mockAxios.post.mockImplementationOnce(() => (
        Promise.resolve({ response: 200, data: dummyUser })
      ));
      await store.dispatch(login(validParams));
      actions = store.getActions();
    });
    it('should dispatch setCurrentUser and setError', () => {
      actions.forEach((action) => expect(types.includes(action.type)).toBe(true));
    });
    it('authenticates currentUser in store', () => {
      expect(actions[0].currentUser.data).toEqual(dummyUser);
    });
    it('sets up error to null', () => {
      expect(actions[1].error).toEqual(null);
    });
  });

  describe('invalid params', () => {
    let actions;

    beforeEach(async () => {
      mockAxios.post.mockImplementationOnce(() => Promise.reject({ status: 401, message: 'Invalid 401' }));

      await store.dispatch(login({}));
      actions = store.getActions();
    });

    it('dispatches setCurrentUser and setError', () => {
      actions.forEach(action => {
        expect(types.includes(action.type)).toBe(true);
      });
    });

    it('does not authenticate currentUser in store', () => {
      expect(actions[0].currentUser.authenticated).toBe(false);
      expect(actions[0].currentUser.data).toBe(null);
    });

    it('sets the error in the store', () => {
      expect(actions[1].error).toBe('Invalid credentials');
    });
  });

  describe('other errors', () => {
    let actions;

    beforeEach(async () => {
      mockAxios.post.mockImplementationOnce(() => Promise.reject({ status: 502, message: 'Network error' }));

      await store.dispatch(login({}));
      actions = store.getActions();
    });

    it('dispatches setCurrentUser and setError', () => {
      actions.forEach((action) => {
        expect(types.includes(action.type)).toBe(true);
      });
    });

    it('sets the error in the state', () => {
      expect(actions[1].error).toBe('Network error');
    });

    it('does not authenticate currentUser', () => {
      expect(actions[0].currentUser).toEqual({ authenticated: false, data: null });
    });
  });
});
