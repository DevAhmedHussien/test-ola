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
  }, [ points, categoy ]);

  const positionPoints = () => {
    const radius = 220; // Increased radius for positioning points
    const centerX = 252; // Updated to match the new container size
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
                   <span className="hover-circle-id" style={{color:'#42567A',rotate:`${(currentIndex * (360 / points.length))}deg`}}>{point.id}</span>
                </div>
              )}
            </div>
          </div>  

        ))}
      </div>
    </div>
  );
};


// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { CirclePointsProps } from './types';
// import './CirclePoints.scss';

// export const CirclePoints: React.FC<CirclePointsProps> = ({
//   points,
//   categoy,
//   onPointClick,
// }) => {
//   const circleRef = useRef<HTMLDivElement>(null);
//   const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const [previousCategory, setPreviousCategory] = useState<string | null>(categoy.id);

//   // ** rotating cercle during changing value fo points or category
//   useEffect(() => {
//     positionPoints();
//     rotateCircleToActivePoint();
//   }, [points, categoy]);

//   // ** points on my cercle with absoulte position 
//   const positionPoints = () => {
//     const radius = 220;
//     const centerX = 252;
//     const centerY = 252;
//     const angleStep = (2 * Math.PI) / points.length;

//     pointsRef.current.forEach((point, index) => {
//       if (!point) return;

//       const angle = index * angleStep - Math.PI / 3;
//       const x = centerX + radius * Math.cos(angle);
//       const y = centerY + radius * Math.sin(angle);

//       gsap.set(point, {
//         x: x - 6,
//         y: y - 6,
//       });
//     });
//   };

//   //**   get current Index 
//   const currentIndex = points.findIndex((point) => point.id === categoy.id);

//   //**  controlling rotation and selected and hoverd points
//   const rotateCircleToActivePoint = () => {
//     const rotationAngle = -(currentIndex * (360 / points.length));

//     gsap.to(circleRef.current, {
//       rotation: rotationAngle,
//       duration: 1.2,
//       ease: 'power2.inOut',
//     });
//   };

//   const showHoverCircle = (index: number) => {
//     const hoverCircle = pointsRef.current[index]?.querySelector('.hover-circle');
//     gsap.fromTo(
//       hoverCircle,
//       {
//         scale: 0,
//         opacity: 0,
//         backgroundColor: 'black', // Start with a black background
//         // rotation: -20,            // Initial slight rotation
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         backgroundColor: 'white', // Transition to a white background
//         // rotation: 0,
//         duration: 0.5,
//         ease: 'elastic.out(1, 0.5)', // Elastic ease for a bounce effect
//       }
//     );
//   };
  
//   const hideHoverCircle = (index: number) => {
//     const hoverCircle = pointsRef.current[index]?.querySelector('.hover-circle');
//     gsap.to(hoverCircle, {
//       scale: 0,
//       opacity: 0,
//       backgroundColor: 'black',   // Fade the background to black
//       // rotation: 20,               // Add a slight rotation for flair
//       duration: 0.4,
//       ease: 'power2.in',
//     });
//   };
  
//   const handleMouseEnter = (index: number) => {
//     showHoverCircle(index);
//   };

//   const handleMouseLeave = (index: number) => {
//     if (points[index].id !== categoy.id) {
//       hideHoverCircle(index);
//     }
//   };

//   const handlePointClick = (id: string, index: number) => {
//     if (previousCategory !== id) {
//       const prevIndex = points.findIndex((point) => point.id === previousCategory);
//       if (prevIndex !== -1) {
//         hideHoverCircle(prevIndex); // Hide the hover-circle of the previous category
//       }
//     }

//     onPointClick(id);
//     setPreviousCategory(id);
//     showHoverCircle(index); // Show the hover-circle for the new category
//   };

//   return (
//     <div className="circle-points">
//       <div className="circle-container" ref={circleRef}>
//         <svg className="circle-svg">
//           <circle cx="250" cy="250" r="220" />
//         </svg>
//         {points.map((point, index) => (
//           <div key={point.id} className="point-wrapper">
//             <div
//               ref={(el) => (pointsRef.current[index] = el)}
//               className={`point ${point.id === categoy.id ? 'active' : ''}`}
//               onClick={() => handlePointClick(point.id, index)}
//               onMouseEnter={() => handleMouseEnter(index)}
//               onMouseLeave={() => handleMouseLeave(index)}
//             >
//               <div className="hover-circle">
//                 <span
//                   className="hover-circle-id"
//                   style={{
//                     color: '#42567A',
//                     transform: `rotate(${currentIndex * (360 / points.length)}deg)`,
//                   }}
//                 >
//                   {point.id}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
