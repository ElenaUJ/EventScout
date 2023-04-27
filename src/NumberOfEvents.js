import React, { Component } from 'react';

class NumberOfEvents extends Component {
  constructor() {
    super();

    this.state = {
      query: 32,
    };
  }

  handleInputChanged = (event) => {
    const input = event.target.value;
    const query = isNaN(input) ? 32 : input > 100 ? 100 : input < 1 ? 1 : input;
    this.setState({
      query: query,
    });
    this.props.updateEvents(this.props.locations, this.state.query);
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
