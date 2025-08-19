import React from 'react';

const ChartContainer = ({ 
  chartData, 
  interaction, 
  svgRef, 
  historicalView 
}) => {
  const { constants } = chartData;
  const { HEIGHT, WIDTH } = constants;

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <svg
          ref={svgRef}
          width="100%"
          height={HEIGHT + 100}
          viewBox={`0 0 ${WIDTH} ${HEIGHT + 100}`}
          className="chart-svg"
        >
          {/* Empty chart - just the container structure */}
          <rect 
            width="100%" 
            height="100%" 
            fill="#1e293b" 
            stroke="#334155" 
            strokeWidth="1"
          />
          
          {/* Optional placeholder text */}
          <text
            x={WIDTH / 2}
            y={HEIGHT / 2}
            fill="#64748b"
            fontSize="16"
            fontFamily="monospace"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            Chart Area (Empty)
          </text>
        </svg>
      </div>
      
      <div className="chart-instructions">
        <p>• Chart container is ready</p>
        <p>• Chart content has been removed</p>
        <p>• Container structure remains intact</p>
      </div>
    </div>
  );
};

export default ChartContainer;