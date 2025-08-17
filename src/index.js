import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Header
export { default as Header } from './components/Header/Header';

// Sidebar
export { default as Sidebar } from './components/Sidebar/Sidebar';
export { default as PerformanceCard } from './components/Sidebar/PerformanceCard';

// Chart
export { default as ChartContainer } from './components/Chart/ChartContainer';
export { default as ChartControls } from './components/Chart/ChartControls';
export { default as Candlestick } from './components/Chart/Candlestick';

// Dashboard
export { default as Dashboard } from './components/Dashboard/Dashboard';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
