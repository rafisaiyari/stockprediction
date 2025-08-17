import React, { useState, useRef } from 'react';
import './styles/App.css';

// Hooks
import { useChartData } from './hooks/useChartData.js';
import { useChartInteraction } from './hooks/useChartInteraction.js';

// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ChartControls from './components/Chart/ChartControls';
import ChartContainer from './components/Chart/ChartContainer';
import Dashboard from './components/Dashboard/Dashboard';

const StockPredictionApp = () => {
  // State for UI controls
  const [historicalView, setHistoricalView] = useState(true);
  const [predictionView, setPredictionView] = useState(true);
  
  // Chart ref for interactions
  const svgRef = useRef(null);
  
  // Custom hooks for data and interactions
  const chartData = useChartData();
  const interaction = useChartInteraction(svgRef);

  return (
    <div className="stock-app">
      {/* Header Navigation */}
      <Header />

      <div className="stock-content">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Chart Area */}
        <div className="chart-area">
          {/* Chart Controls */}
          <ChartControls
            historicalView={historicalView}
            setHistoricalView={setHistoricalView}
            predictionView={predictionView}
            setPredictionView={setPredictionView}
            zoom={interaction.zoom}
            controls={interaction.controls}
          />

          {/* Interactive Chart */}
          <ChartContainer
            chartData={chartData}
            interaction={interaction}
            svgRef={svgRef}
            historicalView={historicalView}
          />

          {/* Dashboard - Bottom Grid */}
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default StockPredictionApp;