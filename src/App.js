import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart3, Settings, Bell, ZoomOut, ZoomIn, RotateCcw } from 'lucide-react';

const StockPredictionApp = () => {
  const [historicalView, setHistoricalView] = useState(true);
  const [predictionView, setPredictionView] = useState(true);
  const [autoTrading, setAutoTrading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  // Generate more comprehensive candlestick data
  const generateCandlestickData = () => {
    const data = [];
    let price = 150;
    for (let i = 0; i < 100; i++) {
      const volatility = 0.02 + Math.random() * 0.03; // 2-5% volatility
      const trend = Math.sin(i * 0.1) * 0.001; // Slight trending
      const change = (Math.random() - 0.5) * price * volatility + price * trend;
      
      const open = price;
      const close = price + change;
      const spread = Math.abs(change) * (0.5 + Math.random());
      const high = Math.max(open, close) + spread * Math.random();
      const low = Math.min(open, close) - spread * Math.random();
      
      data.push({ 
        open: Math.round(open * 100) / 100, 
        high: Math.round(high * 100) / 100, 
        low: Math.round(low * 100) / 100, 
        close: Math.round(close * 100) / 100, 
        bullish: close > open,
        volume: Math.floor(Math.random() * 1000000) + 100000
      });
      price = close;
    }
    return data;
  };

  const candlestickData = generateCandlestickData();

  // Calculate price range for scaling
  const priceRange = candlestickData.reduce(
    (range, candle) => ({
      min: Math.min(range.min, candle.low),
      max: Math.max(range.max, candle.high)
    }),
    { min: Infinity, max: -Infinity }
  );

  const chartHeight = 400;
  const chartWidth = 800;
  const candleWidth = 8;
  const candleSpacing = 12;

  // Scale price to chart coordinates
  const priceToY = (price) => {
    const padding = (priceRange.max - priceRange.min) * 0.1;
    const adjustedMin = priceRange.min - padding;
    const adjustedMax = priceRange.max + padding;
    return chartHeight - ((price - adjustedMin) / (adjustedMax - adjustedMin)) * chartHeight;
  };

  const Candlestick = ({ data, index }) => {
    const { open, high, low, close, bullish } = data;
    const x = index * candleSpacing;
    
    const openY = priceToY(open);
    const closeY = priceToY(close);
    const highY = priceToY(high);
    const lowY = priceToY(low);
    
    const bodyHeight = Math.abs(closeY - openY);
    const bodyY = Math.min(openY, closeY);
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + candleWidth / 2}
          y1={highY}
          x2={x + candleWidth / 2}
          y2={lowY}
          stroke={bullish ? '#10b981' : '#ef4444'}
          strokeWidth="2"
        />
        {/* Body */}
        <rect
          x={x}
          y={bodyY}
          width={candleWidth}
          height={Math.max(bodyHeight, 1)}
          fill={bullish ? '#10b981' : '#ef4444'}
          stroke={bullish ? '#10b981' : '#ef4444'}
          strokeWidth="1"
        />
      </g>
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      setPan(prev => ({
        x: prev.x + deltaX / zoom,
        y: prev.y + deltaY / zoom
      }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev * zoomFactor)));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false });
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const PerformanceCard = ({ title, value, change, isPositive }) => (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          <span className="ml-2 text-lg font-semibold">{change}</span>
        </div>
      </div>
    </div>
  );

  const currentPrice = candlestickData[candlestickData.length - 1]?.close || 0;
  const previousPrice = candlestickData[candlestickData.length - 2]?.close || 0;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(2);

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
          {/* Chart Controls */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-2xl font-bold">PRICE ANALYSIS AND PREDICTIONS</h2>
              
              <div className="flex items-center space-x-6">
                {/* View Controls */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={historicalView}
                      onChange={(e) => setHistoricalView(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500"
                    />
                    <span className="text-sm font-medium">HISTORICAL</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={predictionView}
                      onChange={(e) => setPredictionView(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500"
                    />
                    <span className="text-sm font-medium">PREDICTION</span>
                  </label>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center space-x-2 bg-slate-700 rounded-lg p-2">
                  <button
                    onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
                    className="p-2 hover:bg-slate-600 rounded transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="px-2 text-sm font-mono">{(zoom * 100).toFixed(0)}%</span>
                  <button
                    onClick={() => setZoom(prev => Math.min(5, prev * 1.25))}
                    className="p-2 hover:bg-slate-600 rounded transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={resetView}
                    className="p-2 hover:bg-slate-600 rounded transition-colors ml-2"
                    title="Reset View"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex-1 flex flex-col">
            <div className="relative overflow-hidden rounded-lg bg-slate-900 border border-slate-600 flex-1">
              <svg
                ref={svgRef}
                width="100%"
                height={chartHeight + 100}
                viewBox={`0 0 ${chartWidth} ${chartHeight + 100}`}
                className="cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                
                {/* Grid */}
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Chart Group with Transform */}
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  {/* Price Grid Lines */}
                  {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                    const price = priceRange.min + (priceRange.max - priceRange.min) * ratio;
                    const y = priceToY(price);
                    return (
                      <g key={ratio}>
                        <line
                          x1="0"
                          y1={y}
                          x2={candlestickData.length * candleSpacing}
                          y2={y}
                          stroke="#475569"
                          strokeWidth="1"
                          opacity="0.5"
                          strokeDasharray="5,5"
                        />
                        <text
                          x="5"
                          y={y - 5}
                          fill="#94a3b8"
                          fontSize="12"
                          fontFamily="monospace"
                        >
                          ${price.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Candlesticks */}
                  {historicalView && candlestickData.map((data, index) => (
                    <Candlestick key={index} data={data} index={index} />
                  ))}
                  
                  {/* Moving Average Line */}
                  {historicalView && (
                    <path
                      d={candlestickData.reduce((path, candle, index) => {
                        if (index < 10) return path;
                        const avg = candlestickData.slice(index - 9, index + 1)
                          .reduce((sum, c) => sum + c.close, 0) / 10;
                        const x = index * candleSpacing + candleWidth / 2;
                        const y = priceToY(avg);
                        return path + (index === 10 ? `M ${x} ${y}` : ` L ${x} ${y}`);
                      }, '')}
                      stroke="#f59e0b"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.8"
                    />
                  )}
                </g>
                
                {/* Zoom indicator */}
                <text
                  x={chartWidth - 100}
                  y="30"
                  fill="#94a3b8"
                  fontSize="12"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  Zoom: {(zoom * 100).toFixed(0)}% | Scroll to zoom, drag to pan
                </text>
              </svg>
            </div>
            
            <div className="mt-4 text-sm text-slate-400">
              <p>• Mouse wheel or zoom buttons to zoom in/out</p>
              <p>• Click and drag to pan around the chart</p>
              <p>• Yellow line shows 10-period moving average</p>
            </div>
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