import React, { Component } from 'react';

class Event extends Component {
  constructor() {
    super();

    this.state = {
      showDetails: false,
    };
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
        <h2 className="title">{event.summary}</h2>
        <p className="short-info">
          {startTime} ({event.start.timeZone})
          <br />@{event.summary} | {event.location}
        </p>
        {this.state.showDetails ? (
          <div className="details">
            <h3>About event:</h3>
            <a href={event.htmlLink}>See details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        ) : null}
        <button className="btn-details" onClick={this.toggleDetails}>
          {this.state.showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    );
  }
}

export { Event };
