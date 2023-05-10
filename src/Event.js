import React, { Component } from 'react';
import { WarningAlert } from './Alert.js';

class Event extends Component {
  constructor() {
    super();

    this.state = {
      showDetails: false,
      warningText: '',
    };
  }

  // Current time can only be set once when the component mounts, otherwise app will crash.
  // Still have to adjust to display the adjusted time to the current tome zone for the events though.
  componentDidMount() {
    const event = this.props.event;
    const startDate = new Date(event.start.dateTime);
    const todaysDate = new Date();
    const timeDiff = startDate.getTime() - todaysDate.getTime();
    // Division by number of milliseconds per day to get days
    const dayDiff = timeDiff / 86400000;

    if (dayDiff < 2 && dayDiff >= 0) {
      this.setState({ warningText: 'Hurry! Event is coming up soon.' });
    }
  }

  toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    const event = this.props.event;
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
      timeZone: event.start.timeZone,
    };
    const startTime = new Date(event.start.dateTime).toLocaleString(
      'en-US',
      options
    );

    return (
      <div>
        <div className="title-wrapper">
          <h2 className="name">{event.summary}</h2>
          <WarningAlert text={this.state.warningText} />
        </div>
        <p className="short-info">
          {startTime} ({event.start.timeZone})
          <br />@{event.summary} | {event.location}
        </p>
        {this.state.showDetails ? (
          <div className="details">
            <h4>About the event:</h4>
            <p>{event.description}</p>
            <a href={event.htmlLink}>See details on Google Calendar</a>
          </div>
        ) : null}
        <button className="details-btn" onClick={this.toggleDetails}>
          {this.state.showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    );
  }
}

export { Event };
