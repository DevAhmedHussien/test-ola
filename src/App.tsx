import React, { useState, useEffect , useRef} from 'react';
import { CirclePoints } from './components/CirclePoints/CirclePoints';
import { categoryData } from './data/categoryData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles/global.scss';
import { gsap } from 'gsap';
import { EventsSlider } from './components/TimeIntervalBlock/components/EventsSlider/EventsSlider';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categoryData[0]);

  const cardsRef = useRef<HTMLDivElement>(null);
  const handlePointClick = (id: number) => {
    const selectedCategory = categoryData.find(category => category.id === id);
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = categoryData.findIndex(category => category.id === activeCategory.id);
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + categoryData.length) % categoryData.length
        : (currentIndex + 1) % categoryData.length;

    setActiveCategory(categoryData[newIndex]);
  };
  
 // Animate cards when the active category changes
 useEffect(() => {
  if (cardsRef.current) {
    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }
}, [activeCategory]);

  return (
    <div className="app-container">

      <h1 style={{padding:'1rem',
        borderLeft:'5px solid red' //linear-gradient(180deg, #3877EE -5%, #EF5DA8 85%)
        }}>Исторические даты</h1>
      <hr style={{
        position:'relative',
        top:'200px', 
        opacity:'0.2'}}/> 
      <hr style={{
        rotate:'90deg',
        opacity:'0.2'}}/> 

{/* 
        <div style={{position:'absolute',top:"25%",left:'31%', display:'flex',justifyContent:"center",gap:'2rem'}}>
        <h1 style={{fontSize:"100px"}}>{activeCategory.label}</h1>
        <h1 style={{fontSize:"100px"}}>{activeCategory.label}</h1>

        </div> */}



      <div className="content-wrapper">
        <div className="navigation-container">
          <CirclePoints
            points={categoryData}
            categoy={activeCategory}
            onPointClick={handlePointClick}
            onPointHover={() => {}}
          />
        </div>

        <div>0{activeCategory.id}/0{categoryData.length}</div>
        <div style={{display:'flex', gap:'0.5rem'}}>
        <button
            className="nav-button"
            onClick={() => handleNavigation('prev')}
            aria-label="Previous Category"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="nav-button"
            onClick={() => handleNavigation('next')}
            aria-label="Next Category"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="point-label" 
         style={{position:'absolute', top:'30%',right:'37%'}}>{activeCategory.label}
         </div>
  
        <div >
          <h2 className="category-title">{activeCategory.label}</h2>
        <div ref={cardsRef}>
        <EventsSlider
            events={activeCategory.cards}
            onSlideChange={activeCategory.id}
        />
        </div>

        </div>
      </div>
    </div>
  );
};

export default App;
