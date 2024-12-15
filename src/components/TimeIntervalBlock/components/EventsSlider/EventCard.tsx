import React from 'react';
import { Event } from '../../types';
import './EventCard.scss';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="event-card">
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <span className="event-date">{event.date}</span>
  </div>
);