import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const Dashboard = () => {
  const [autoTrading, setAutoTrading] = useState(false);

  return (
    <div className="bottom-grid">
      {/* Performance Metrics */}
      <div className="metrics-section">
        <h3 className="metrics-title">PERFORMANCE METRICS</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Model Accuracy</div>
            <div className="metric-value">94.2%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Success Rate</div>
            <div className="metric-value">87.1%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Confidence</div>
            <div className="metric-value">92.5%</div>
          </div>
        </div>
        <div className="metrics-footer">
          <button className="icon-button">
            <Settings size={16} />
          </button>
          <div className="pagination-dots">
            <div className="dot active"></div>
            <div className="dot inactive"></div>
            <div className="dot inactive"></div>
          </div>
          <button className="icon-button">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Buy Signal */}
      <div className="signal-section">
        <h3 className="signal-title">Next Buy Signal</h3>
        <div className="signal-content">
          <div className="signal-price">$172.69</div>
          <div className="signal-time">Expected in 2-3 days</div>
          
          <div className="auto-trading-toggle">
            <span className="toggle-label">Auto Trading</span>
            <button
              onClick={() => setAutoTrading(!autoTrading)}
              className={`toggle-switch ${autoTrading ? 'active' : 'inactive'}`}
            >
              <div className={`toggle-slider ${autoTrading ? 'active' : 'inactive'}`} />
            </button>
          </div>

          <div className="status-badge">Monitoring</div>

          <div className="signal-buttons">
            <button className="signal-button">Technical Indicator</button>
            <button className="signal-button">Model Performance</button>
          </div>
        </div>
      </div>

      {/* Recent Trades & Risk Management */}
      <div className="trades-risk-section">
        <div className="mini-section">
          <h3 className="mini-title">Recent Trades</h3>
          <div className="mini-content">
            <div className="mini-row">
              <span className="mini-label">AAPL</span>
              <span className="mini-value positive">+$234</span>
            </div>
            <div className="mini-row">
              <span className="mini-label">TSLA</span>
              <span className="mini-value negative">-$45</span>
            </div>
            <div className="mini-row">
              <span className="mini-label">GOOGL</span>
              <span className="mini-value positive">+$189</span>
            </div>
          </div>
        </div>

        <div className="mini-section">
          <h3 className="mini-title">Risk Management</h3>
          <div className="mini-content">
            <div className="mini-row">
              <span className="mini-label">Portfolio Value</span>
              <span className="mini-value">$12,450</span>
            </div>
            <div className="mini-row">
              <span className="mini-label">Daily P&L</span>
              <span className="mini-value positive">+$189</span>
            </div>
            <div className="mini-row">
              <span className="mini-label">Risk Score</span>
              <span className="mini-value warning">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;