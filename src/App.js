import React, { Component } from 'react';
import './App.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CitySearch />
        <EventList />
      </div>
    );
  }
}

export { App };
