import React from 'react';
import Candlestick from './Candlestick';

const ChartContainer = ({ 
  chartData, 
  interaction, 
  svgRef, 
  historicalView 
}) => {
  const { 
    candlestickData, 
    priceRange, 
    priceToY, 
    movingAverage, 
    constants 
  } = chartData;
  
  const { zoom, pan, isDragging, handlers } = interaction;
  const { HEIGHT, WIDTH, CANDLE_SPACING, COLORS } = constants;

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <svg
          ref={svgRef}
          width="100%"
          height={HEIGHT + 100}
          viewBox={`0 0 ${WIDTH} ${HEIGHT + 100}`}
          className={`chart-svg ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handlers.handleMouseDown}
          onMouseMove={handlers.handleMouseMove}
          onMouseUp={handlers.handleMouseUp}
          onMouseLeave={handlers.handleMouseUp}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="1" 
                opacity="0.3"
              />
            </pattern>
          </defs>
          
          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart Content with Transform */}
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
                    x2={candlestickData.length * CANDLE_SPACING}
                    y2={y}
                    stroke={COLORS.GRID}
                    strokeWidth="1"
                    opacity="0.5"
                    strokeDasharray="5,5"
                  />
                  <text
                    x="5"
                    y={y - 5}
                    fill={COLORS.TEXT}
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
              <Candlestick 
                key={index} 
                data={data} 
                index={index} 
                priceToY={priceToY}
              />
            ))}
            
            {/* Moving Average Line */}
            {historicalView && movingAverage.length > 0 && (
              <path
                d={movingAverage.reduce((path, point, index) => {
                  return path + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`);
                }, '')}
                stroke={COLORS.MOVING_AVERAGE}
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            )}
          </g>
          
          {/* Zoom Indicator */}
          <text
            x={WIDTH - 100}
            y="30"
            fill={COLORS.TEXT}
            fontSize="12"
            fontFamily="monospace"
            textAnchor="end"
          >
            Zoom: {(zoom * 100).toFixed(0)}% | Scroll to zoom, drag to pan
          </text>
        </svg>
      </div>
      
      <div className="chart-instructions">
        <p>• Mouse wheel or zoom buttons to zoom in/out</p>
        <p>• Click and drag to pan around the chart</p>
        <p>• Yellow line shows 10-period moving average</p>
      </div>
    </div>
  );
};

export default ChartContainer;