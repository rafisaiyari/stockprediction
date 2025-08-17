// Format price with proper decimal places
export const formatPrice = (price, decimals = 2) => {
    return `$${price.toFixed(decimals)}`;
  };
  
  // Format percentage with sign
  export const formatPercentage = (value, decimals = 2) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
  };
  
  // Format large numbers (for volume, portfolio values)
  export const formatLargeNumber = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };
  
  // Format currency with commas
  export const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };
  
  // Calculate price change and percentage
  export const calculatePriceChange = (current, previous) => {
    const change = current - previous;
    const percentChange = ((change / previous) * 100);
    
    return {
      absolute: change,
      percentage: percentChange,
      isPositive: change >= 0,
      formattedAbsolute: formatPrice(Math.abs(change)),
      formattedPercentage: formatPercentage(percentChange)
    };
  };