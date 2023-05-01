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
      eventCount: 32,
      currentLocation: 'all',
    };
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      this.setState({ currentLocation: location });
      const locationEvents =
        location === 'all' || ''
          ? events
          : events.filter((event) => event.location === location);
      const eventCount = !this.state.eventCount ? 32 : this.state.eventCount;
      const shownEvents = locationEvents.slice(0, eventCount);
      this.setState({ events: shownEvents });
    });
  };

  updateEventCountState = (eventCount) => {
    this.setState({ eventCount: eventCount });
    this.updateEvents(this.state.currentLocation);
  };

  componentDidMount() {
    this.mounted = true;
    // The state is only set when the component is mounted, so there is time for the fetch call to be completed
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
          eventCount: 32,
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
        <NumberOfEvents updateEventCountState={this.updateEventCountState} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export { App };
