import React from 'react';
import { CHART_CONSTANTS } from '../../utils/chartUtils';

const Candlestick = ({ data, index, priceToY }) => {
  const { open, high, low, close, bullish } = data;
  const { CANDLE_WIDTH, CANDLE_SPACING, COLORS } = CHART_CONSTANTS;
  
  const x = index * CANDLE_SPACING;
  const color = bullish ? COLORS.BULLISH : COLORS.BEARISH;
  
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
        x1={x + CANDLE_WIDTH / 2}
        y1={highY}
        x2={x + CANDLE_WIDTH / 2}
        y2={lowY}
        stroke={color}
        strokeWidth="2"
      />
      {/* Body */}
      <rect
        x={x}
        y={bodyY}
        width={CANDLE_WIDTH}
        height={Math.max(bodyHeight, 1)}
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
    </g>
  );
};

export default Candlestick;