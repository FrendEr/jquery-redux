import { createConnect } from 'jquery-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createStore from './createStore';

const sagaMiddleware = createSagaMiddleware();
const store = createStore([sagaMiddleware]);
const connect = createConnect(store);
sagaMiddleware.run(rootSaga);

export default connect;
export {
  store
};
