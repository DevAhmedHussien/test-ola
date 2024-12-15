import React, { useState } from 'react';
import { CircleNavigation } from './components/CircleNavigation/CircleNavigation';
import { IntervalInfo } from './components/IntervalInfo/IntervalInfo';
import { EventsSlider } from './components/EventsSlider/EventsSlider';
import { TimeInterval } from './types';
import './TimeIntervalBlock.scss';

interface TimeIntervalBlockProps {
  intervals: TimeInterval[];
}

export const TimeIntervalBlock: React.FC<TimeIntervalBlockProps> = ({ intervals }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="time-interval-block">
      <CircleNavigation
        totalPoints={intervals.length}
        activeIndex={activeIndex}
        onPointClick={setActiveIndex}
      />
      <IntervalInfo interval={intervals[activeIndex]} />
      <EventsSlider
        events={intervals[activeIndex].events}
        onSlideChange={setActiveIndex}
      />
    </div>
  );
};