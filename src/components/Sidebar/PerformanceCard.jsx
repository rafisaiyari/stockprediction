import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PerformanceCard = ({ title, value, change, isPositive }) => (
  <div className="performance-card">
    <div className="performance-header">
      <div>
        <p className="performance-title">{title}</p>
        <p className="performance-value">{value}</p>
      </div>
      <div className={`performance-indicator ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        <span className="performance-change">{change}</span>
      </div>
    </div>
  </div>
);

export default PerformanceCard;