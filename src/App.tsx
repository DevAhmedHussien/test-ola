// ** React
import React, { useState, useEffect, useRef } from 'react';

// ** third party 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

// ** Resuble componenet 
import { EventsSlider } from './components/EventsSlider/EventsSlider';
import { CirclePoints } from './components/CirclePoints/CirclePoints';
import { categoryData } from './data/categoryData';
import NavButton from './components/button/Button';

// ** Scss styles 
import './styles/global.scss';

const App: React.FC = () => {
  
  // ** states
  const [activeCategory, setActiveCategory] = useState(categoryData[0]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  // ** animmated parts of componenets 
  useEffect(() => {
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -50, scale: 0.95, filter: 'brightness(2)' },
        { opacity: 1, x: 0, scale: 1, filter: 'brightness(1)', duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    if (titleRef.current && spanRef.current) {
      gsap.fromTo(
        titleRef.current,
        { textContent: 2000 },
        { textContent: activeCategory.cards[0].title, duration: 0.5, ease: 'power2.out', snap: { textContent: 1 } }
      );

      gsap.fromTo(
        spanRef.current,
        { textContent: 2000 },
        { textContent: activeCategory.cards[5].title, duration: 0.5, ease: 'power2.out', snap: { textContent: 1 } }
      );
    }
  }, [activeCategory]);

  // ** selection clicked category by  clicking on point
  const handlePointClick = (id: number) => {
    const selectedCategory = categoryData.find((category) => category.id === id);
    if (selectedCategory) setActiveCategory(selectedCategory);
  };

  // ** choose selecting category by button left and right 
  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = categoryData.findIndex((category) => category.id === activeCategory.id);
    const newIndex = direction === 'prev' ? (currentIndex - 1 + categoryData.length) % categoryData.length : (currentIndex + 1) % categoryData.length;
    setActiveCategory(categoryData[newIndex]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title"> <span /> Исторические<br /> даты  </h1>
      <h2 className="data-counter">
        <span ref={titleRef}>{activeCategory.cards[0].title}</span>
        <span ref={spanRef}>{activeCategory.cards[5].title}</span>
      </h2>
        <hr className="x-axis" />
        <hr className="y-axis" />

      <div className="cercle-part" style={{ margin: '-8rem 0 0 0' }}>
        <CirclePoints 
          points={categoryData} 
          categoy={activeCategory} 
          onPointClick={handlePointClick} />
      </div>

      <div className="button-part">
        <h2>
          0{activeCategory.id}/0{categoryData.length}
        </h2>
        <div>
          <NavButton
            isActive={activeCategory.id === 1}
            onClick={() => handleNavigation('prev')}
            ariaLabel="Previous Category"
            icon={<ChevronLeft size={24} />} 
          />
          <NavButton
            isActive={activeCategory.id === 6}
            onClick={() => handleNavigation('next')}
            aria-label="Next Category"
            icon={<ChevronRight size={24} />} 
          />
        </div>
      </div>

      <div ref={labelRef} className="point-label">
        {activeCategory.label}
      </div>
        <hr className="hamada" />
      <div className="spec-cards" ref={cardsRef}>
        <EventsSlider events={activeCategory.cards} />
      </div>
    </div>
  );
};

export default App;
