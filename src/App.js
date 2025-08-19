import { useState } from 'react';
import './styles/App.css';

// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import CandlestickChart from './components/Chart/CandlestickChart';

const StockPredictionApp = () => {
  const [timePeriod, setTimePeriod] = useState('7'); // Default to 7 days
  const [stockSelection, setStockSelection] = useState('AAPL'); // Default stock selection

  return (
    <div className="stock-app">
      {/* Header Navigation */}
      <Header />

      <div className="stock-content">
        {/* Left Sidebar */}
        <Sidebar timePeriod={timePeriod} setTimePeriod={setTimePeriod} stockSelection={stockSelection} setStockSelection={setStockSelection}/>

        {/* Main Chart Area */}
        <div className="chart-area">

          {/* Interactive Chart */}
          <CandlestickChart timePeriod={timePeriod} stockSelection={stockSelection}/>
            
          {/* Dashboard - Bottom Grid */}
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default StockPredictionApp;