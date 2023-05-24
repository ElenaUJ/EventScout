import React, { Component } from 'react';
import { Event } from './Event.js';
import { ErrorAlert } from './Alert.js';

class EventList extends Component {
  constructor() {
    super();

    this.state = {
      errorText: '',
    };
  }

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        errorText:
          'Page loaded from cache. Check your internet connection and refresh for updated content.',
      });
    }
  }

  render() {
    const { events } = this.props;
    return (
      <div className="event-list">
        <ErrorAlert text={this.state.errorText} />
        <ul>
          {events.map((event) => (
            <li className="event" key={event.id}>
              <Event event={event} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { EventList };
