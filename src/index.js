import React from 'react';
import ReactDom from 'react-dom';

import {AppProvider} from './context';
import App from './App';
import './index.css';

ReactDom.render(
  <AppProvider>
    <App/>
  </AppProvider>
,document.getElementById('root'));