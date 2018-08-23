import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const logger = createLogger();

export default (middlewares) => {
  const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const middlewaresList = [...middlewares];

  if (__DEV__) {
    middlewaresList.push(logger);
  }

  return createStore(reducers, composeEnhancers(
    applyMiddleware(...middlewaresList)
  ));
}
