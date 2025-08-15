import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, Settings, Bell } from 'lucide-react';

const StockPredictionApp = () => {
  const [historicalView, setHistoricalView] = useState(true);
  const [predictionView, setPredictionView] = useState(true);
  const [autoTrading, setAutoTrading] = useState(false);

  // Mock candlestick data
  const generateCandlestickData = () => {
    const data = [];
    let price = 150;
    for (let i = 0; i < 50; i++) {
      const change = (Math.random() - 0.5) * 10;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      
      data.push({ open, high, low, close, bullish: close > open });
      price = close;
    }
    return data;
  };

  const candlestickData = generateCandlestickData();

  const Candlestick = ({ data, width = 8, index }) => {
    const { open, high, low, close, bullish } = data;
    const bodyHeight = Math.abs(close - open) * 3;
    const wickTop = high - Math.max(open, close);
    const wickBottom = Math.min(open, close) - low;
    
    return (
      <g transform={`translate(${index * (width + 2)}, 200)`}>
        {/* Upper wick */}
        <line
          x1={width / 2}
          y1={-wickTop * 3}
          x2={width / 2}
          y2={0}
          stroke={bullish ? '#10b981' : '#ef4444'}
          strokeWidth="1"
        />
        {/* Body */}
        <rect
          x="0"
          y={bullish ? -bodyHeight : 0}
          width={width}
          height={bodyHeight}
          fill={bullish ? '#10b981' : '#ef4444'}
        />
        {/* Lower wick */}
        <line
          x1={width / 2}
          y1={bullish ? 0 : bodyHeight}
          x2={width / 2}
          y2={bullish ? wickBottom * 3 : bodyHeight + wickBottom * 3}
          stroke={bullish ? '#10b981' : '#ef4444'}
          strokeWidth="1"
        />
      </g>
    );
  };

  const PerformanceCard = ({ title, value, change, isPositive }) => (
    <div className="bg-slate-700 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-xl font-semibold">{value}</p>
      </div>
      <div className={`flex items-center ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        <span className="ml-1 text-sm">{change}</span>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-slate-800 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">maangas</div>
        <div className="flex items-center space-x-8">
          <nav className="flex space-x-6">
            <button className="text-emerald-400 hover:text-emerald-300">Predict</button>
            <button className="text-slate-400 hover:text-white">Analyze</button>
            <button className="text-slate-400 hover:text-white">Model</button>
            <button className="text-slate-400 hover:text-white">About Us</button>
          </nav>
          <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg">
            Login
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-slate-900 p-6 space-y-6 border-r border-slate-700 flex flex-col overflow-y-auto">
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-600">
            <h2 className="text-lg font-semibold mb-4">STOCK SELECTION</h2>
            
            {/* Stock Dropdown */}
            <select className="w-full bg-slate-700 rounded-lg p-3 text-white border border-slate-500 focus:border-emerald-500 focus:outline-none">
              <option>AAPL - Apple Inc.</option>
              <option>GOOGL - Alphabet Inc.</option>
              <option>TSLA - Tesla Inc.</option>
              <option>MSFT - Microsoft Corp.</option>
            </select>

            {/* Filter Buttons */}
            <div className="flex space-x-2 mt-4">
              <button className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg text-sm">
                Tech
              </button>
              <button className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg text-sm">
                Growth
              </button>
            </div>

            {/* Sliders */}
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Risk Tolerance</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="60" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Investment Amount</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="40" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Time Horizon</label>
                <input type="range" className="w-full" min="0" max="100" defaultValue="70" />
              </div>
            </div>

            {/* Time Period */}
            <div className="mt-6">
              <select className="w-full bg-slate-700 rounded-lg p-3 text-white border border-slate-500 focus:border-emerald-500 focus:outline-none">
                <option>1 Week</option>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>1 Year</option>
              </select>
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded-lg mt-4">
              Apply Filters
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <PerformanceCard title="Daily Return" value="+2.4%" change="+0.3%" isPositive={true} />
            <PerformanceCard title="Volatility" value="18.2%" change="-1.1%" isPositive={false} />
            <PerformanceCard title="Sharpe Ratio" value="1.34" change="+0.05" isPositive={true} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6 flex flex-col overflow-hidden">
          {/* Chart Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">PRICE ANALYSIS AND PREDICTIONS</h1>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={historicalView}
                  onChange={(e) => setHistoricalView(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">HISTORICAL</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={predictionView}
                  onChange={(e) => setPredictionView(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">PREDICTION</span>
              </label>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-slate-900 rounded-xl p-6 flex-1 min-h-0">
            <svg width="100%" height="100%" viewBox="0 0 800 300" className="w-full h-full">
              {candlestickData.map((data, index) => (
                <Candlestick key={index} data={data} index={index} />
              ))}
            </svg>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6 flex-shrink-0">
            {/* Performance Metrics */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">PERFORMANCE METRICS</h3>
              <div className="space-y-3">
                <div className="bg-emerald-500 rounded-lg p-3 text-center">
                  <div className="text-sm opacity-80">Model Accuracy</div>
                  <div className="text-xl font-bold">94.2%</div>
                </div>
                <div className="bg-emerald-500 rounded-lg p-3 text-center">
                  <div className="text-sm opacity-80">Success Rate</div>
                  <div className="text-xl font-bold">87.1%</div>
                </div>
                <div className="bg-emerald-500 rounded-lg p-3 text-center">
                  <div className="text-sm opacity-80">Confidence</div>
                  <div className="text-xl font-bold">92.5%</div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button className="p-2 bg-slate-700 rounded-lg">
                  <Settings size={16} />
                </button>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                </div>
                <button className="p-2 bg-slate-700 rounded-lg">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {/* Buy Signal */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Next Buy Signal</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$172.69</div>
                <div className="text-sm text-slate-400 mb-4">Expected in 2-3 days</div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">Auto Trading</span>
                  <button
                    onClick={() => setAutoTrading(!autoTrading)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      autoTrading ? 'bg-emerald-500' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        autoTrading ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm mb-4">
                  Monitoring
                </div>

                <div className="flex space-x-2">
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs">
                    Technical Indicator
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs">
                    Model Performance
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Trades & Risk Management */}
            <div className="space-y-3">
              <div className="bg-slate-900 rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-3">Recent Trades</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">AAPL</span>
                    <span className="text-emerald-400">+$234</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">TSLA</span>
                    <span className="text-red-400">-$45</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">GOOGL</span>
                    <span className="text-emerald-400">+$189</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-3">Risk Management</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Portfolio Value</span>
                    <span className="text-white">$12,450</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Daily P&L</span>
                    <span className="text-emerald-400">+$189</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Risk Score</span>
                    <span className="text-yellow-400">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPredictionApp;