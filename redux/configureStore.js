import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const sagaMiddleWare = createSagaMiddleware();

const middleWares = process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(sagaMiddleWare, logger)) : compose(applyMiddleware(sagaMiddleWare));

const configureStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    middleWares,
  );

  sagaMiddleWare.run(rootSaga);

  return store;
};

export default configureStore;
