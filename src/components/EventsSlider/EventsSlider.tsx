import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Event } from './types';
import './EventsSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import { EventCard } from './EventCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsSliderProps {
  events: Event[];
}

export const EventsSlider: React.FC<EventsSliderProps> = ({ events }) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };


  const goNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const goPrev = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  return (
    <div className="events-slider-container">
        {/* Conditional Left Arrow */}
        {activeIndex > 0 && (
        <button
          className="nav-button"
          onClick={goPrev}
          aria-label="Next card"
        >
        <ChevronLeft size={24} />
        </button>
      )}

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
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
        <button
          className="nav-button"
          onClick={goNext}
          aria-label="Previous card"
        >
        <ChevronRight size={24} />
      </button>
      )}
    </div>
  );
};
