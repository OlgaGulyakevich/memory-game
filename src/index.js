import './i18n';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
require('./styles/style.css');

const container = document.getElementById('root');
const root = createRoot(container);

// Определяем basename в зависимости от окружения
const basename = process.env.PUBLIC_URL || '';

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);