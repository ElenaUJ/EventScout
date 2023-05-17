import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import { EventList } from './EventList.js';
import { CitySearch } from './CitySearch.js';
import { NumberOfEvents } from './NumberOfEvents';
import { EventGenre } from './EventGenre.js';
import {
  getEvents,
  extractLocations,
  checkToken,
  getAccessToken,
} from './api.js';
import { WelcomeScreen } from './WelcomeScreen.js';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      // Splitting the locations at the occurrence of comma followed by space, returning an array
      // Then, shift() method gets the first array element, which is the city name
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
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
    // Question: According to the PDF to implement the Welcome Screen I was supposed to add these lines. However when I did, it broke my app when offline. It would just show the empty div, a white screen. So... is this line necessary at all?
    // if (this.state.showWelcomeScreen === undefined)
    //   return <div className="App" />;

    return (
      <div className="App">
        <header className="header">
          <div className="logo">EventScout</div>
          <div className="slogan">Stay in the Loop</div>
        </header>
        <div className="content">
          <h4>Choose your nearest city</h4>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents updateEventCountState={this.updateEventCountState} />
          <div className="data-vis-wrapper">
            <EventGenre events={this.state.events} />
            <h4>Events in each city</h4>
            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis
                  type="number"
                  dataKey="number"
                  name="number of events"
                  allowDecimals={false}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
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
