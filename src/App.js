import React from 'react';
import './App.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export { App };
