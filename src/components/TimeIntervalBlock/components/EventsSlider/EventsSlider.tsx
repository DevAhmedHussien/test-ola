import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Event } from '../../types';
import { EventCard } from './EventCard';
import './EventsSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';

interface EventsSliderProps {
  events: Event[];
  onSlideChange: (index: number) => void;
}

export const EventsSlider: React.FC<EventsSliderProps> = ({
  events,
  onSlideChange,
}) => (
  <Swiper
    modules={[Navigation]}
    spaceBetween={30}
    slidesPerView={4}
    navigation
    onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
    className="events-slider"
  >
    {events.map((event, index) => (
      <SwiperSlide key={index}>
        <EventCard event={event} />
      </SwiperSlide>
    ))}
  </Swiper>
);
