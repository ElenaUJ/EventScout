import React, { Component } from 'react';
import { Event } from './Event.js';
import { InfoAlert } from './Alert.js';

class EventList extends Component {
  constructor() {
    super();

    this.state = {
      infoText: '',
    };
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        infoText:
          'Content may not be up to date: This page was loaded from the cache. You are currently offline or experiencing connectivity issues, so the information displayed may not be the latest version. Please check your internet connection and refresh the page to see the most recent content.',
      });
    }
  }

  render() {
    const { events } = this.props;
    return (
      <>
        <InfoAlert text={this.state.infoText} />
        <ul className="event-list">
          {events.map((event) => (
            <li className="event" key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export { EventList };
