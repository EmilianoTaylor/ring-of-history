import { useEffect, useState } from 'react';
import './App.css'
import { Point } from './components/interfsces/rootInterfaces';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    { id: 1, angle: 0, active: false, name: 'Спорт'},
    { id: 2, angle: 60, active: false, name: 'Экономика' },
    { id: 3, angle: 120, active: false, name: 'Литература' },
    { id: 4, angle: 180, active: false, name: 'Медицина' },
    { id: 5, angle: 240, active: false, name: 'Кино' },
    { id: 6, angle: 300, active: true, name: 'Наука' },
  ]);

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [circleAngle, setCircleAngle] = useState(0);
	const pointIdFinder = points.find((point) => point.active)?.id

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

	const setPrevPage = () => {
		const activePoint = points.find((point) => point.active);
		if (activePoint) {
			const prevPoint = points.find((point) => point.id === activePoint.id - 1);
			if (prevPoint) {
				const angleDiff = (360 - prevPoint.angle - 60) % 360;
				setCircleAngle(angleDiff);
				const newPoints = points.map((p) => {
					if (p.active) {
						return { ...p, active: false };
					}
					return p;
				});
				newPoints[prevPoint.id - 1].active = true;
				setPoints(newPoints);
			}
		}
	};
	
	const setNextPage = () => {
		const activePoint = points.find((point) => point.active);
		if (activePoint) {
			const nextPoint = points.find((point) => point.id === activePoint.id + 1);
			if (nextPoint) {
				const angleDiff = (360 - nextPoint.angle - 60) % 360;
				setCircleAngle(angleDiff);
				const newPoints = points.map((p) => {
					if (p.active) {
						return { ...p, active: false };
					}
					return p;
				});
				newPoints[nextPoint.id - 1].active = true;
				setPoints(newPoints);
			}
		}
	};

  return (
    <div className="rootBlock">
			<header className='rootHeader'>
				<span className='rootHeaderText'>Исторические даты</span>
			</header>
      <div className="circleContainer">
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
							onMouseOut={handleMouseOut}
							onClick={() => handleClick(point)}
						>
							<span className="point-text" style={{ fontSize: point.active || (hoveredPoint && hoveredPoint.id === point.id) ? "18px" : 0 }}>{point.id}</span>
						</div>
        	))}
        </div>
        <div className="circleLabel">
          {points.find((point) => point.active)?.name}
        </div>
      </div>
			<div className='switcherContainer'>
				<span className='switcherPageNumbers'>{pointIdFinder}/{points.length}</span>
				<span className='switcherButtons'>
					<button className="switcherPrev" onClick={setPrevPage} disabled={pointIdFinder== 1}>←</button>
					<button className="switcherNext" onClick={setNextPage} disabled={pointIdFinder == 6}>→</button>
				</span>	
			</div>
    </div>
  );
};

export default App;