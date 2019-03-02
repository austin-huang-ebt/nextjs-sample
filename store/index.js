import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
// import logger from 'redux-logger';

// const middlewares = [logger, thunk];
const middlewares = [thunk];

const reducers = combineReducers({
  form: formReducer,
});

export default function makeStore(initialState, options) { // eslint-disable-line no-unused-vars
  // please install redux-devtools extension for chrome
  // eslint-disable-next-line no-undef
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // eslint-disable-next-line no-undef
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  const store = createStore(
    reducers,
    initialState,
    enhancer,
  );
  return store;
}
