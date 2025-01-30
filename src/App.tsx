import { useEffect, useState } from 'react';
import './App.css'
import { Point } from './components/interfsces/rootInterfaces';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    { id: 1, angle: 0, active: false, name: 'Кино'},
    { id: 2, angle: 60, active: false, name: 'Кино' },
    { id: 3, angle: 120, active: false, name: 'Литература' },
    { id: 4, angle: 180, active: false, name: 'Кино' },
    { id: 5, angle: 240, active: false, name: 'Кино' },
    { id: 6, angle: 300, active: true, name: 'Наука' },
  ]);

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const [circleAngle, setCircleAngle] = useState(0);

  const handleMouseOver = (point: Point) => {
    if (!point.active) {
      setHoveredPoint(point);
    }
  };

  const handleMouseOut = () => {
    setHoveredPoint(null);
  };

  const handleClick = (point: Point) => {
    if (!point.active) {
      const angleDiff = (360 - point.angle - 60) % 360;
      setCircleAngle(angleDiff);
      const newPoints = points.map((p) => {
        if (p.active) {
          return { ...p, active: false };
        }
        return p;
      });
      newPoints[point.id - 1].active = true;
      setPoints(newPoints);
    }
  };

  return (
    <div className="rootBlock">
      <div className="container">
        <div
          className="circle"
          style={{
            transform: `rotate(${circleAngle}deg)`,
          }}
        >
					{points.map(point => (
						<div
							key={point.id}
							className={`point ${point.active || (hoveredPoint && hoveredPoint.id === point.id) ? 'active' : ''}`}
							style={{ '--angle': `${point.angle}deg` }}
							onMouseOver={() => handleMouseOver(point)}
							onMouseOut={handleMouseOut }
							onClick={() => handleClick(point)}
						>
							<span className="point-text" style={{ fontSize: point.active || (hoveredPoint && hoveredPoint.id === point.id) ? "18px" : 0 }}>{point.id}</span>
						</div>
        	))}
        </div>
        <div className="label">
          {points.find((point) => point.active)?.name}
        </div>
      </div>
    </div>
  );
};

export default App;