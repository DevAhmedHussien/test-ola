// ** React
import React, { useRef, useState } from 'react';

// ** third party 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 

// ** Icon
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ** Resuble componenet 
import { EventCard } from './EventCard';
import { Event } from './types';

// ** Scss styles 
import './EventsSlider.scss';

interface EventsSliderProps {
  events: Event[];
}

export const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  
  // ** States 
  const [activeIndex, setActiveIndex] = useState(0);

  // ** Ref
  const swiperRef = useRef<any>(null);

  // ** Controlling active index 
  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // ** going next index 
  const goNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  // ** going previous index 
  const goPrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="events-slider-container">
      
      {/* Conditional Left Arrow */}
      {activeIndex > 0 && (
        <button className="nav-button hide" onClick={goPrev} aria-label="Previous card">
          <ChevronLeft size={24} />
        </button>
      )}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            pagination: { enabled: true },
          },
          600: {
            slidesPerView: 3,
            pagination: { enabled: true },
          },
          768: {
            slidesPerView: 3,
            pagination: { enabled: false },
          },
          1024: {
            slidesPerView: 4,
            pagination: { enabled: false },
          },
        }}
        onSlideChange={handleSlideChange}
        className="events-slider"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Conditional Right Arrow */}
      {activeIndex < events.length - 4 && (
        <button className="nav-button hide" 
            onClick={goNext} 
            aria-label="Next card">
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};
