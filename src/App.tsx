import React, { useState, useEffect, useRef } from 'react';
import { CirclePoints } from './components/CirclePoints/CirclePoints';
import { categoryData } from './data/categoryData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles/global.scss';
import { gsap } from 'gsap';
import { EventsSlider } from './components/EventsSlider/EventsSlider';
// import { EventsSlider } from './components/EventsSlider/EventsSlider';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categoryData[0]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Animate the label change with GSAP
  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        {
          opacity: 0,
          x: -50,           // Increased y-offset for more pronounced motion
          scale: 0.95,     // Slight initial scale-down for a dynamic effect
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,   // Slightly longer duration for smoothness
          ease: 'power3.out', // Use power3.out for smoother easing
        }
      );
    }
  }, [activeCategory]);
  

  // Animate cards when the active category changes
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [activeCategory]);

  const handlePointClick = (id: number) => {
    const selectedCategory = categoryData.find((category) => category.id === id);
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = categoryData.findIndex((category) => category.id === activeCategory.id);
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + categoryData.length) % categoryData.length
        : (currentIndex + 1) % categoryData.length;

    const newCategory = categoryData[newIndex];
    setActiveCategory(newCategory);
  };

  return (
    <div className="app-container">
      <h1
        style={{
          width: '353px',
          padding: '0rem 0rem 0rem 4rem',
          position: 'relative',
          fontFamily: 'PT Sans',
          fontSize: '56px',
          fontWeight: 700,
          lineHeight: '67.2px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '5px',
            background: 'linear-gradient(180deg, #3877EE -5%, #EF5DA8 85%)',
          }}
        />
        Исторические даты
      </h1>

      <h2
        style={{
          position: 'absolute',
          top: '13%',
          left: '21%',
          color: '#3877EE',
          fontSize: '9rem',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        2015 <span style={{ color: '#EF5DA8' }}>2022</span>
      </h2>

      <hr
        style={{
          position: 'relative',
          top: '141px',
          opacity: '0.2',
        }}
      />
      <hr
        style={{
          rotate: '90deg',
          opacity: '0.2',
        }}
      />

      <div>
        <div style={{ margin: '-8rem 0 0 0' }}>
          <CirclePoints points={categoryData} categoy={activeCategory} onPointClick={handlePointClick} />
        </div>

        <div
          style={{
            width: '120px',
            padding: '0rem 0rem 0rem 4rem',
            height: '88px',
            margin: '-5rem 0',
          }}
        >
          <h2
            style={{
              fontFamily: 'PT Sans',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '18.12px',
            }}
          >
            0{activeCategory.id}/0{categoryData.length}
          </h2>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button  style={{opacity :activeCategory.id === 1 && 0.7 }} disabled={activeCategory.id === 1}
              className="nav-button"
             onClick={() => handleNavigation('prev')} 
             aria-label="Previous Category">
              <ChevronLeft size={24} />
            </button>
            <button  style={{opacity:activeCategory.id === 6 && 0.7 }} disabled={activeCategory.id === 6} 
            className="nav-button" onClick={() => handleNavigation('next')} aria-label="Next Category">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div ref={labelRef} className="point-label" style={{  fontSize: '24px', fontWeight: 600 }}>
          {activeCategory.label}
        </div>

        <div
          ref={cardsRef}
          style={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EventsSlider events={activeCategory.cards} onSlideChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default App;
