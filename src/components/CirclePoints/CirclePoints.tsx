import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CirclePointsProps } from './types';
import './CirclePoints.scss';

export const CirclePoints: React.FC<CirclePointsProps> = ({
  points,
  categoy,
  onPointClick,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  useEffect(() => {
    positionPoints();
    rotateCircleToActivePoint();
  }, [points.length, categoy]);

  const positionPoints = () => {
    const radius = 220; // Increased radius for positioning points
    const centerX = 250; // Updated to match the new container size
    const centerY = 250;
    const angleStep = (2 * Math.PI) / points.length;
  
    pointsRef.current.forEach((point, index) => {
      if (!point) return;
  
      const angle = index * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
  
      gsap.set(point, {
        x: x - 6,
        y: y - 6,
      });
    });
  };
  
  const currentIndex = points.findIndex((point) => point.id === categoy.id);

  const rotateCircleToActivePoint = () => {
    const rotationAngle = -(currentIndex * (360 / points.length));

    gsap.to(circleRef.current, {
      rotation: rotationAngle,
      duration: 1.2,
      ease: 'power2.inOut',
    });
  };

  return (
    <div className="circle-points">
      <div className="circle-container" ref={circleRef}>
        <svg className="circle-svg">
          <circle cx="150" cy="150" r="140" />
        </svg>
        {points.map((point, index) => (
          <div key={point.id} className="point-wrapper">
            <div
              ref={(el) => (pointsRef.current[index] = el)}
              className={`point ${point.id === categoy.id ? 'active' : ''}`}
              onClick={() => onPointClick(point.id)}
              onMouseEnter={() => setHoveredPoint(point.id)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {(point.id === categoy.id || hoveredPoint === point.id) && (
                <div className="hover-circle">
                   <span className="hover-circle-id" style={{rotate:`${(currentIndex * (360 / points.length))}deg`}}>{point.id}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
