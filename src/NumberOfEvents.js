import React, { Component } from 'react';

class NumberOfEvents extends Component {
  constructor() {
    super();

    this.state = {
      query: '32',
    };
  }

  handleInputChanged = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          className="number-of-events"
          type="number"
          value={this.state.query}
          onChange={this.handleInputChanged}
        ></input>
      </div>
    );
  }
}

export { NumberOfEvents };
