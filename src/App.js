import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Home } from './container';
import appStore from './redux/reducers';
// import logo from './logo.svg';
import './App.css';

const store = createStore(appStore);

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;

