import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

import ContextProvider from './context/Context.jsx'
 ReactDOM.createRoot(document.getElementById('root')).render(
 <ContextProvider>
 <App/>
 </ContextProvider>
);


