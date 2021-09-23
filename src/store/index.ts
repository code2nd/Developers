import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as common from './common';
import * as manage from 'pages/manage/store';
import * as website from 'pages/website/store';
import * as blog from 'pages/blog/store';

export const reducers = combineReducers({
  common: common.reducers,
  manage: manage.reducers,
  website: website.reducers,
  blog: blog.reducers
});

const dev = process.env.NODE_ENV === 'development';

const store = dev ? 
createStore(
  reducers, 
  compose(applyMiddleware(thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
) :
createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
