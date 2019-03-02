import { initialize } from 'redux-form';
import * as actions from '../actions';
import * as constants from '../config/constants';

function initializeState(store, ctx) {
  store.dispatch(initialize(constants.REDUX_FORM_NAME, {}));

  // allow to use http://localhost?todoId=4 to load initial todo
  const todoIdToInitialize = ctx.req.query.todoId || 1;
  // below actually returns a Promise which could be "await"'ed
  return store.dispatch(actions.fetchTodo(todoIdToInitialize));
}

export default initializeState;
