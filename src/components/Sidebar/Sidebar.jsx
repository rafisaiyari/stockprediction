import React from 'react';
import PerformanceCard from './PerformanceCard';

const Sidebar = () => {
  return (
    <div className="stock-sidebar">
      <div className="sidebar-section">
        <h2 className="sidebar-title">STOCK SELECTION</h2>
        
        {/* Stock Dropdown */}
        <select className="stock-select">
          <option>AAPL - Apple Inc.</option>
          <option>GOOGL - Alphabet Inc.</option>
          <option>TSLA - Tesla Inc.</option>
          <option>MSFT - Microsoft Corp.</option>
        </select>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button className="filter-button">Tech</button>
          <button className="filter-button">Growth</button>
        </div>

        {/* Sliders */}
        <div className="slider-group">
          <div className="slider-container">
            <label className="slider-label">Risk Tolerance</label>
            <input type="range" className="slider-input" min="0" max="100" defaultValue="60" />
          </div>
          <div className="slider-container">
            <label className="slider-label">Investment Amount</label>
            <input type="range" className="slider-input" min="0" max="100" defaultValue="40" />
          </div>
          <div className="slider-container">
            <label className="slider-label">Time Horizon</label>
            <input type="range" className="slider-input" min="0" max="100" defaultValue="70" />
          </div>
        </div>

        {/* Time Period */}
        <div style={{ marginTop: '1.5rem' }}>
          <select className="stock-select">
            <option>1 Week</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>1 Year</option>
          </select>
        </div>

        <button className="primary-button">Apply Filters</button>
      </div>

      {/* Performance Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <PerformanceCard title="Daily Return" value="+2.4%" change="+0.3%" isPositive={true} />
        <PerformanceCard title="Volatility" value="18.2%" change="-1.1%" isPositive={false} />
        <PerformanceCard title="Sharpe Ratio" value="1.34" change="+0.05" isPositive={true} />
      </div>
    </div>
  );
};

export default Sidebar;