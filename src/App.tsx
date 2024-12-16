import React, { useState, useEffect, useRef } from 'react';
import { CirclePoints } from './components/CirclePoints/CirclePoints';
import { categoryData } from './data/categoryData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles/global.scss';
import { gsap } from 'gsap';
import { EventsSlider } from './components/EventsSlider/EventsSlider';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categoryData[0]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

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

  const handlePointClick = (id: number) => {
    const selectedCategory = categoryData.find((category) => category.id === id);
    if (selectedCategory) setActiveCategory(selectedCategory);
  };

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
        <CirclePoints points={categoryData} categoy={activeCategory} onPointClick={handlePointClick} />
      </div>

      <div className="button-part">
        <h2>
          0{activeCategory.id}/0{categoryData.length}
        </h2>
        <div>
          <button
            style={{ opacity: activeCategory.id === 1 && 0.4 }}
            disabled={activeCategory.id === 1}
            className="nav-button"
            onClick={() => handleNavigation('prev')}
            aria-label="Previous Category"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            style={{ opacity: activeCategory.id === 6 && 0.4 }}
            disabled={activeCategory.id === 6}
            className="nav-button"
            onClick={() => handleNavigation('next')}
            aria-label="Next Category"
          >
            <ChevronRight size={24} />
          </button>
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
