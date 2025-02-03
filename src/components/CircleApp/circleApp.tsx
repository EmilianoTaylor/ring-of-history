import { useState } from 'react';
import { Point } from '../interfaces/rootInterfaces';
import '../../../node_modules/swiper/swiper.scss'
import NotesPanel from '../notesPanel/sliderPanel';
import CircleContainer from '../circle/circleContainer';
import CircleDates from '../circle/dates/circleDates';
import SwitcherContainer from '../circle/switcher/switcherContainer';
import { pointsBlock, notes } from '../circle/circleData';
import Header from '../header/headerComponent';

const CircleApp = () => {
	const [points, setPoints] = useState<Point[]>(pointsBlock);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [circleAngle, setCircleAngle] = useState<number>(0);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const pointIdFinder = points.find((point) => point.active)?.id;
	const activePoint = points.find((point) => point.active);
	const activeNotes = activePoint ? notes[activePoint.name] : [];

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
			setIsAnimating(true);
			setTimeout(() => {
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
				setTimeout(() => {
					setIsAnimating(false);
				}, 1000);
			}, 500)
    }
  };
	
	const setPage = (direction: number) => {
		setIsAnimating(true);
		const activePoint = points.find((point) => point.active);
		if (activePoint) {
			const newPointId = activePoint.id + direction;
			const newPoint = points.find((point) => point.id === newPointId);
			if (newPoint) {
				setTimeout(() => {
					const angleDiff = (360 - newPoint.angle - 60) % 360;
					setCircleAngle(angleDiff);
					const newPoints = points.map((p) => {
						if (p.active) {
							return { ...p, active: false };
						}
						return p;
					});
					newPoints[newPointId - 1].active = true;
					setPoints(newPoints);
					setTimeout(() => {
						setIsAnimating(false);
					}, 500);
				}, 500)
			}
		}
	};

  return (
    <div className="rootBlock">
			<Header />
			<CircleContainer
        points={points}
        circleAngle={circleAngle}
        hoveredPoint={hoveredPoint}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        handleClick={handleClick}
				isAnimating={isAnimating}
      />
			<CircleDates 
				isAnimating={isAnimating} 
				activeNotes={activeNotes} 
			/>
			<SwitcherContainer 
				points={points} 
				isAnimating={isAnimating} 
				pointIdFinder={pointIdFinder} 
				setPrevPage={() => setPage(-1)} 
				setNextPage={() => setPage(1)}
			/>
			<NotesPanel 
				points={points} 
				notes={notes} 
				isAnimating={isAnimating}
			/>
    </div>
  );
};

export default CircleApp;