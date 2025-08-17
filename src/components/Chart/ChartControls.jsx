import React from 'react';
import { ZoomOut, ZoomIn, RotateCcw } from 'lucide-react';

const ChartControls = ({ 
  historicalView, 
  setHistoricalView, 
  predictionView, 
  setPredictionView,
  zoom,
  controls 
}) => {
  return (
    <div className="chart-controls">
      <div className="controls-header">
        <h2 className="chart-title">PRICE ANALYSIS AND PREDICTIONS</h2>
        
        <div className="controls-group">
          {/* View Controls */}
          <div className="view-controls">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={historicalView}
                onChange={(e) => setHistoricalView(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-label">HISTORICAL</span>
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={predictionView}
                onChange={(e) => setPredictionView(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-label">PREDICTION</span>
            </label>
          </div>

          {/* Zoom Controls */}
          <div className="zoom-controls">
            <button
              onClick={controls.zoomOut}
              className="zoom-button"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="zoom-indicator">{(zoom * 100).toFixed(0)}%</span>
            <button
              onClick={controls.zoomIn}
              className="zoom-button"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={controls.resetView}
              className="zoom-button"
              style={{ marginLeft: '0.5rem' }}
              title="Reset View"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartControls;