import React, { Component } from 'react';

class NumberOfEvents extends Component {
  constructor() {
    super();

    this.state = {
      query: '32',
    };
  }

  handleInputChanged = (event) => {
    const input = event.target.value;
    this.setState({
      query: isNaN(parseInt(input))
        ? '32'
        : parseInt(input) > 100
        ? '100'
        : input,
    });
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
