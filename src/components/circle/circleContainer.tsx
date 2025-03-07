import { CSSProperties } from 'react';
import { CircleContainerProps, Point } from '../interfaces/rootInterfaces';
import './circleContainer.scss'

const CircleContainer = ({ points, circleAngle, hoveredPoint, handleMouseOver, handleMouseOut, handleClick, isAnimating }: CircleContainerProps) => {
  return (
    <div className="circleContainer">
      <div
        className="circle"
        style={{
          transform: `rotate(${circleAngle}deg)`,
        }}
      >
        {points.map((point: Point) => (
          <div
            key={point.id}
            className={`point ${point.active || (hoveredPoint && hoveredPoint.id === point.id) ? 'active' : ''}`}
            style={{ '--angle': `${point.angle}deg` } as CSSProperties}
            onMouseOver={() => handleMouseOver(point)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(point)}
          >
            <span className="point-text" style={{ fontSize: point.active || (hoveredPoint && hoveredPoint.id === point.id) ? "18px" : 0 }}>{point.id}</span>
          </div>
        ))}
      </div>
      <div className={`circleLabel ${isAnimating ? 'hidden' : ''}`}>
        {points.find((point: Point) => point.active)?.name}
      </div>
    </div>
  );
};

export default CircleContainer;