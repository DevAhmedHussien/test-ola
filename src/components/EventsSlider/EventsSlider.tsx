import React, { useRef, useState } from 'react';

// ** Third-party imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ** Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ** Reusable component
import { EventCard } from './EventCard';
import { Event } from './types';

// ** SCSS styles
import './EventsSlider.scss';

interface EventsSliderProps {
  events: Event[];
}

export const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {

  // ** State to track active index
  const [activeIndex, setActiveIndex] = useState(0);

  // ** Ref for Swiper instance
  const swiperRef = useRef<any>(null);

  // ** Handle slide change
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // ** Go to next slide
  const goNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  // ** Go to previous slide
  const goPrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="events-slider-container">

      {/* Conditional Left Arrow */}
      {activeIndex > 0 && (
        <button className="nav-button" 
          onClick={goPrev} 
          aria-label="Previous card">
          <ChevronLeft size={24} />
        </button>
      )}
      
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={'auto'} 
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onSlideChange={handleSlideChange}
        className="events-slider"
        style={{ paddingRight: '40px' }} 
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} style={{ width: '250px' }}>
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Conditional Right Arrow */}
      {activeIndex < events.length - 1 && (
        <button className="nav-button" onClick={goNext} aria-label="Next card">
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};
