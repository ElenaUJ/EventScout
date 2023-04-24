import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';
import { NumberOfEvents } from './NumberOfEvents';
import { getEvents, extractLocations } from './api.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
    };
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents });
    });
  };

  componentDidMount() {
    this.mounted = true;
    // The state is only set when the component is mounted, so there is time for the fetch call to be completed
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export { App };
