// Generate comprehensive candlestick data
export const generateCandlestickData = (dataPoints = 100, startPrice = 150) => {
    const data = [];
    let price = startPrice;
    
    for (let i = 0; i < dataPoints; i++) {
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
  
  // Calculate price range for scaling
  export const calculatePriceRange = (candlestickData) => {
    return candlestickData.reduce(
      (range, candle) => ({
        min: Math.min(range.min, candle.low),
        max: Math.max(range.max, candle.high)
      }),
      { min: Infinity, max: -Infinity }
    );
  };
  
  // Create price to Y coordinate scaling function
  export const createPriceToYScale = (priceRange, chartHeight) => {
    return (price) => {
      const padding = (priceRange.max - priceRange.min) * 0.1;
      const adjustedMin = priceRange.min - padding;
      const adjustedMax = priceRange.max + padding;
      return chartHeight - ((price - adjustedMin) / (adjustedMax - adjustedMin)) * chartHeight;
    };
  };
  
  // Calculate moving average
  export const calculateMovingAverage = (data, period = 10) => {
    return data.map((_, index) => {
      if (index < period - 1) return null;
      
      const slice = data.slice(index - period + 1, index + 1);
      const average = slice.reduce((sum, candle) => sum + candle.close, 0) / period;
      return {
        index,
        value: average,
        x: index * 12 + 4, // candleSpacing * index + candleWidth/2
        y: null // Will be calculated with priceToY function
      };
    }).filter(point => point !== null);
  };
  
  // Chart constants
  export const CHART_CONSTANTS = {
    HEIGHT: 400,
    WIDTH: 800,
    CANDLE_WIDTH: 8,
    CANDLE_SPACING: 12,
    COLORS: {
      BULLISH: '#10b981',
      BEARISH: '#ef4444',
      MOVING_AVERAGE: '#f59e0b',
      GRID: '#475569',
      TEXT: '#94a3b8'
    }
  };