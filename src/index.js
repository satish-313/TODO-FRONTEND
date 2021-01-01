import React from 'react';
import ReactDom from 'react-dom';
import {CookiesProvider} from 'react-cookie'

import {AppProvider} from './context';
import App from './App';
import './index.css';

ReactDom.render(
  <AppProvider>
    <CookiesProvider>
      <App/>
    </CookiesProvider> 
  </AppProvider>
,document.getElementById('root'));