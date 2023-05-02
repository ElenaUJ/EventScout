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

  // Question: Is it ok this way? I know in the curriculum they said updateEvents should take both eventCount and location parameters, but doesn't it work this way, too?
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
        <header className="header">
          <div className="logo">EventScout</div>
          <div className="slogan">Stay in the Loop</div>
        </header>
        <div className="content">
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents updateEventCountState={this.updateEventCountState} />
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export { App };
