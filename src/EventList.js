import React from 'react';
import { Event } from './Event.js';

function EventList({ events }) {
  return (
    <ul className="EventList">
      {events.map((event) => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
}

export { EventList };
