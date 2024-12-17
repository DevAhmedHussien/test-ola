// ** React
import React, { useEffect, useRef, useState } from 'react';

// ** third party 
import { gsap } from 'gsap';

// ** Resuble componenet 
import { CirclePointsProps } from './types';

// ** Scss styles 
import './CirclePoints.scss';

export const CirclePoints: React.FC<CirclePointsProps> = ({
  points,
  categoy,
  onPointClick,
}) => {
  // ** States 
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // ** Ref 
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  //** Adding on cerlce and rotate page instead of points & categoy 
  useEffect(() => {
    positionPoints();
    rotateCircleToActivePoint();
  }, [ points, categoy ]);

  // ** putting point on cercle
  const positionPoints = () => {
    const radius = 220;
    const centerX = 252; 
    const centerY = 252;
    const angleStep = (2 * Math.PI) / points.length;
  
    pointsRef.current.forEach((point, index) => {
      if (!point) return;
  
      const angle = index * angleStep - Math.PI / 3.000;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
  
      gsap.set(point, {
        x: x - 6,
        y: y - 6,
      });
    });
  };
  
  // ** Finding current index to able to make some changes 
  const currentIndex = points.findIndex((point) => point.id === categoy.id);

  // ** 
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
                   <span className="hover-circle-id" style={{rotate:`${(currentIndex * (360 / points.length))}deg`}}>
                      {point.id}</span>
                </div>
              )}
            </div>
          </div>  

        ))}
      </div>
    </div>
  );
};
