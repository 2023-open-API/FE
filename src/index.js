import '@toast-ui/calendar/toastui-calendar.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    <App view="month"/>
  </React.StrictMode>,
  document.getElementById('app')
);