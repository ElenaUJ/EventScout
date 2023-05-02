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
        <h2 className="name">{event.summary}</h2>
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
