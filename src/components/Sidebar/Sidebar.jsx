import React from "react";
import PerformanceCard from "./PerformanceCard";

const Sidebar = ({
  timePeriod,
  setTimePeriod,
  stockSelection,
  setStockSelection,
}) => {
  return (
    <div className="stock-sidebar">
      <div className="sidebar-section">
        <h2 className="sidebar-title">STOCK SELECTION</h2>

        {/* Stock Dropdown */}
        <select
          className="stock-select"
          value={stockSelection}
          onChange={(e) => setStockSelection(e.target.value)}
        >
          <option value="AAPL">AAPL - Apple Inc.</option>
          <option value="TSLA">TSLA - Tesla Inc.</option>
          <option value="MSFT">MSFT - Microsoft Corp.</option>
          <option value="ETH">ETH - Ethereum</option>
          <option value="SOL">SOL - Solana</option>
          <option value="XRP">XRP - Ripple</option>
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
            <input
              type="range"
              className="slider-input"
              min="0"
              max="100"
              defaultValue="60"
            />
          </div>
          <div className="slider-container">
            <label className="slider-label">Investment Amount</label>
            <input
              type="range"
              className="slider-input"
              min="0"
              max="100"
              defaultValue="40"
            />
          </div>
          <div className="slider-container">
            <label className="slider-label">Time Horizon</label>
            <input
              type="range"
              className="slider-input"
              min="0"
              max="100"
              defaultValue="70"
            />
          </div>
        </div>

        {/* Time Period */}
        <div style={{ marginTop: "1.5rem" }}>
          <select
            className="stock-select"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="7">1 Week</option>
            <option value="30">1 Month</option>
          </select>
        </div>
        <button className="primary-button">Apply Filters</button>
      </div>

      {/* Performance Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <PerformanceCard
          title="Daily Return"
          value="+2.4%"
          change="+0.3%"
          isPositive={true}
        />
        <PerformanceCard
          title="Volatility"
          value="18.2%"
          change="-1.1%"
          isPositive={false}
        />
        <PerformanceCard
          title="Sharpe Ratio"
          value="1.34"
          change="+0.05"
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default Sidebar;
