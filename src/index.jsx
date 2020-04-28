import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Main from './components/templates/main';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  rootElement
);
