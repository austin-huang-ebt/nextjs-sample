import fetch from 'isomorphic-fetch';
import { change } from 'redux-form';
import * as constants from '../config/constants';

export function fetchTodo(id) {
  return dispatch => fetch(`${
    // "typeof window === 'object'" is to decide wheher we are running in server
    // or browser.
    // In pages/_document.js, we put process.env.UISVR_APISERVER into
    // window.__APISERVER__.
    typeof window === 'object'
      ? window.__APISERVER__
      : process.env.UISVR_APISERVER
  }todos/${ id }`)
    .then(response => response.json())
    .then(todo => {
      // save to redux-form state
      dispatch(change(constants.REDUX_FORM_NAME, 'todo', todo));
    });
}
