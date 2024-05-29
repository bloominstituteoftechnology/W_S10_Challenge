import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Correct relative path to store.js
import App from './src/App'; // Correct relative path to App.js
import './styles.css'; // Correct relative path to styles.css in the frontend folder

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
