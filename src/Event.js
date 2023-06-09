import React, { Component } from 'react';
import { WarningAlert, ErrorAlert } from './Alert.js';

class Event extends Component {
  constructor() {
    super();

    this.state = {
      showDetails: false,
      warningText: '',
      errorText: '',
    };
  }

  // Current time can only be set once when the component mounts, otherwise app will crash.
  componentDidMount() {
    const event = this.props.event;
    const startDate = new Date(event.start.dateTime);
    const todaysDate = new Date();
    const timeDiff = startDate.getTime() - todaysDate.getTime();
    // Division by number of milliseconds per day to get days
    const dayDiff = timeDiff / 86400000;

    if (dayDiff < 1 && dayDiff >= 0) {
      this.setState({ warningText: 'Event is coming up soon.' });
    }

    if (dayDiff < 0) {
      this.setState({ errorText: 'Hurry! Event has already started.' });
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
    };
    const startTime = new Date(event.start.dateTime).toLocaleString(
      'en-US',
      options
    );

    return (
      <div>
        <div className="title-wrapper">
          <h2 className="name">{event.summary}</h2>
          {this.state.warningText !== '' ? (
            <WarningAlert text={this.state.warningText} />
          ) : this.state.errorText !== '' ? (
            <ErrorAlert text={this.state.errorText} />
          ) : null}
        </div>
        <p className="short-info">
          {startTime}
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
