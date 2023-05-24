import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';
import { NumberOfEvents } from './NumberOfEvents';
import { EventGenre } from './EventGenre.js';
import { EventLocations } from './EventLocations.js';
import {
  getEvents,
  extractLocations,
  checkToken,
  getAccessToken,
} from './api.js';
import { WelcomeScreen } from './WelcomeScreen.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
      locations: [],
      eventCount: 32,
      currentLocation: 'all',
      showWelcomeScreen: undefined,
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

  async componentDidMount() {
    this.mounted = true;
    // This is just for the localhost testing environment, because with the below code it wouldn't update the events state when mounted
    if (window.location.href.startsWith('http://localhost') && this.mounted) {
      getEvents().then((events) => {
        this.setState({
          events: events,
          locations: extractLocations(events),
          eventCount: 32,
        });
      });
      return;
    }

    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if (code || (isTokenValid && this.mounted)) {
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
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined && navigator.onLine) {
      return (
        <div className="App">
          <header className="header">
            <div className="logo">EventScout</div>
            <div className="slogan">Stay in the Loop</div>
          </header>
        </div>
      );
    }

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
          <EventGenre events={this.state.events} />
          <EventLocations
            events={this.state.events}
            locations={this.state.locations}
          />
          <EventList events={this.state.events} />
        </div>
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export { App };
