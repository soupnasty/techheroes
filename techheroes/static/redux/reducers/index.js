import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import info from './info';

export default combineReducers({
  info,
  form,
  reduxAsyncConnect,
  routing: routerReducer
});
