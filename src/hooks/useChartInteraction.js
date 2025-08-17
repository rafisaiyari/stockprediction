import { useState, useCallback, useEffect } from 'react';

export const useChartInteraction = (svgRef) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      setPan(prev => ({
        x: prev.x + deltaX / zoom,
        y: prev.y + deltaY / zoom
      }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastMousePos, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom controls
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev * zoomFactor)));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(5, prev * 1.25));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(0.5, prev * 0.8));
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Setup wheel event listener
  useEffect(() => {
    const svg = svgRef?.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false });
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel, svgRef]);

  return {
    zoom,
    pan,
    isDragging,
    handlers: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp
    },
    controls: {
      zoomIn,
      zoomOut,
      resetView
    }
  };
};