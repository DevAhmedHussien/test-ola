import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CircleNavigation.scss';

interface CircleNavigationProps {
  totalPoints: number;
  activeIndex: number;
  onPointClick: (index: number) => void;
}

export const CircleNavigation: React.FC<CircleNavigationProps> = ({
  totalPoints,
  activeIndex,
  onPointClick,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!circleRef.current) return;
    positionPoints();
  }, [totalPoints]);

  useEffect(() => {
    rotateToActivePoint();
  }, [activeIndex]);

  const positionPoints = () => {
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    const angleStep = (2 * Math.PI) / totalPoints;

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

  const rotateToActivePoint = () => {
    const angleStep = 360 / totalPoints;
    const targetRotation = -angleStep * activeIndex;

    gsap.to(circleRef.current, {
      rotation: targetRotation,
      duration: 0.8,
      ease: "power2.inOut"
    });

    gsap.to('.point-label', {
      rotation: -targetRotation,
      duration: 0.8,
      ease: "power2.inOut"
    });
  };

  const handlePointClick = (index: number) => {
    onPointClick(index);
    
    gsap.to('.navigation-point', {
      scale: 1,
      duration: 0.3,
    });

    gsap.to(pointsRef.current[index], {
      scale: 1.5,
      duration: 0.3,
    });
  };

  return (
    <div className="circle-navigation">
      <div className="circle-container" ref={circleRef}>
        <svg className="circle-svg">
          <circle cx="150" cy="150" r="150" />
        </svg>
        
        {Array.from({ length: totalPoints }).map((_, index) => (
          <div
            key={index}
            className="point-wrapper"
          >
            <div
              ref={(el) => (pointsRef.current[index] = el)}
              className={`navigation-point ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handlePointClick(index)}
            />
            <span className="point-label">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};