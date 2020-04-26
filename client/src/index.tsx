import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';

import App from './App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const client = createClient({ url: 'http://localhost:4000/' });

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
