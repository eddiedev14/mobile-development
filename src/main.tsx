import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
);
