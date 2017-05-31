import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducer.js'
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import undoable from 'redux-undo';

combineReducers({
  reducer: undoable(reducer, {
    limit: 10
  })
})

let store = createStore(reducer,
  {
    todos: [{
      text: 'git gud',
      id: Date.now(),
      done: false,
      description: 'here comes dat boi',
      category: '0'
    },
    {
      text: 'ez egy csecsemő',
      id: '13',
      done: false,
      description: '*sigh* boi',
      category: '1'
    }],
    categories: [{
        name: 'csecsemők',
        id: '0',
        parent: false
    },
    {
        name: 'bolgárok',
        id: '1',
        parent: false
    }],
    progress: 0,
    editing: false,
    activeCategory: '0'
  },
  applyMiddleware(
    thunkMiddleware
  ));

store.dispatch({
  type: 'ADD_TODO',
  id: Date.now() +1,
  done: false,
  text: 'read all the stuff!',
  category: '0'
});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
