import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer.js';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import undoable from 'redux-undo';
import { excludeAction } from 'redux-undo';
import { toggleTodo, updateProgress } from './actions/actions.js'

let store = createStore(
  undoable(
    reducer,
    {
      filter: excludeAction([toggleTodo, updateProgress]),
      limit: 10
    }),
  applyMiddleware(thunkMiddleware));

store.dispatch({
  type: 'ADD_TODO',
  id: Date.now() + 1,
  done: false,
  text: 'read all the stuff!',
  category: '0'
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
