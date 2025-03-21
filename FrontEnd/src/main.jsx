import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
});

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);