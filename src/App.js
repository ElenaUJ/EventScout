import React, { Component } from 'react';
import './App.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';
import { NumberOfEvents } from './NumberOfEvents';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CitySearch />
        <NumberOfEvents />
        <EventList />
      </div>
    );
  }
}

export { App };
