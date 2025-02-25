import React from 'react';
import ReactDOM from 'react-dom/client';
import emailjs from '@emailjs/browser';
import './index.css';
import App from './App';

emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);