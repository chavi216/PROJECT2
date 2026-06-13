import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. מייבאים את הראוטר
import App from './App.jsx';
import './index.css'; // או App.css, תלוי מה קיים אצלך בשורש

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. עוטפים את App בתוך הראוטר הגלובלי */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);