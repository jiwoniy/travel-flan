import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { ErrorBoundary } from './components';
import { Init } from './container';
import RootReducer from './redux/reducers';
import './App.css';

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Init />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

