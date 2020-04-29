import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { compose } from 'redux';
import Main from './components/templates/main';
import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rootElement = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  rootElement
);
