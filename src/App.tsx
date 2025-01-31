// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import './App.css'
import './components/sliderPanel/sliderPanel.scss'
import { Point } from './components/interfsces/rootInterfaces';
import { cinemaNotes, economyNotes, literatureNotes, medicineNotes, scienceNotes, sportNotes } from './components/sliderPanel/sliderNotes';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([
    { id: 1, angle: 0, active: false, name: 'Спорт'},
    { id: 2, angle: 60, active: false, name: 'Экономика' },
    { id: 3, angle: 120, active: false, name: 'Литература' },
    { id: 4, angle: 180, active: false, name: 'Медицина' },
    { id: 5, angle: 240, active: false, name: 'Кино' },
    { id: 6, angle: 300, active: true, name: 'Наука' },
  ]);

	const notes = {
		'Спорт': sportNotes,
		'Кино': cinemaNotes,
		'Литература': literatureNotes,
		'Медицина': medicineNotes,
		'Наука': scienceNotes,
		'Экономика': economyNotes,
	};

	const NotesPanel = () => {
		const activePoint = points.find((point) => point.active);
		const activeNotes = notes[activePoint.name];

		const prevRef = useRef(null);
		const nextRef = useRef(null);
		const swiperRef = useRef<SwiperCore>();  
		
	
		return (
			<div className={`notes-panel ${isAnimating ? 'hidden' : ''}`}>
				<Swiper
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper;
					}}
					slidesPerView={(window.innerWidth < 768) ? 2 : 4}
				>
					{activeNotes.map((note, index) => (
						<SwiperSlide key={index}>
							<div className="note">
								<span className="year">{note.year}</span>
								<p className="text">{note.text}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="swiper-button-prev" onClick={() => swiperRef.current?.slidePrev()}>←</div>
				<div className="swiper-button-next" onClick={() => swiperRef.current?.slideNext()}>→</div>
			</div>
		);
	};


  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [circleAngle, setCircleAngle] = useState(0);
	const pointIdFinder = points.find((point) => point.active)?.id
	const activeNotes = notes[points.find((point) => point.active)?.name];

	const [isAnimating, setIsAnimating] = useState(false);

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

	const setPrevPage = () => {
		setIsAnimating(true);
		const activePoint = points.find((point) => point.active);
		if (activePoint) {
			const prevPoint = points.find((point) => point.id === activePoint.id - 1);
			if (prevPoint) {
				setTimeout(() => {
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
					setTimeout(() => {
						setIsAnimating(false);
					}, 500);
				}, 500)
			}
		}
	};
	
	const setNextPage = () => {
		setIsAnimating(true);
		const activePoint = points.find((point) => point.active);
		if (activePoint) {
			const nextPoint = points.find((point) => point.id === activePoint.id + 1);
			if (nextPoint) {
				setTimeout(() => {
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
					setTimeout(() => {
						setIsAnimating(false);
					}, 500);
				}, 500)
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
        <div className={`circleLabel ${isAnimating ? 'hidden' : ''}`}>
          {points.find((point) => point.active)?.name}
        </div>
      </div>
			<div className={`circleDates ${isAnimating ? 'hidden' : ''}`}>
				<span className='firstDate'>{activeNotes[0].year}</span>
				<span className='secondDate'>{activeNotes[activeNotes.length - 1].year}</span>
			</div>
			<div className={`switcherContainer ${isAnimating ? 'hidden' : ''}`}>
				<span className='switcherPageNumbers'>{pointIdFinder}/{points.length}</span>
				<span className='switcherButtons'>
					<button className="switcherPrev" onClick={setPrevPage} disabled={pointIdFinder== 1}>←</button>
					<button className="switcherNext" onClick={setNextPage} disabled={pointIdFinder == 6}>→</button>
				</span>	
			</div>
			<NotesPanel />
    </div>
  );
};

export default App;