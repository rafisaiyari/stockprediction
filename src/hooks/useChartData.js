import { useMemo } from 'react';
import { 
  generateCandlestickData, 
  calculatePriceRange, 
  createPriceToYScale,
  calculateMovingAverage,
  CHART_CONSTANTS 
} from '../utils/chartUtils';
import { calculatePriceChange } from '../utils/formatters';

export const useChartData = () => {
  // Generate candlestick data (memoized to prevent regeneration on every render)
  const candlestickData = useMemo(() => generateCandlestickData(), []);
  
  // Calculate derived data
  const chartData = useMemo(() => {
    const priceRange = calculatePriceRange(candlestickData);
    const priceToY = createPriceToYScale(priceRange, CHART_CONSTANTS.HEIGHT);
    const movingAverage = calculateMovingAverage(candlestickData);
    
    // Add Y coordinates to moving average points
    const movingAverageWithCoords = movingAverage.map(point => ({
      ...point,
      y: priceToY(point.value)
    }));
    
    // Calculate current price metrics
    const currentPrice = candlestickData[candlestickData.length - 1]?.close || 0;
    const previousPrice = candlestickData[candlestickData.length - 2]?.close || 0;
    const priceChange = calculatePriceChange(currentPrice, previousPrice);
    
    return {
      candlestickData,
      priceRange,
      priceToY,
      movingAverage: movingAverageWithCoords,
      currentPrice,
      previousPrice,
      priceChange,
      constants: CHART_CONSTANTS
    };
  }, [candlestickData]);
  
  return chartData;
};