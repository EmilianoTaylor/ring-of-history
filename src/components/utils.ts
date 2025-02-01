export const handleMouseOver = (point: Point, setHoveredPoint: (point: Point | null) => void) => {
  if (!point.active) {
    setHoveredPoint(point);
  }
};

export const handleMouseOut = (setHoveredPoint: (point: Point | null) => void) => {
  setHoveredPoint(null);
};