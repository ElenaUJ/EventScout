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
    this.setState({
      query: input,
    });
    const query = input > 100 ? 100 : input < 1 ? 32 : input;
    this.props.updateEventCountState(query);
  };

  render() {
    return (
      <div>
        <input
          className="numberOfEvents"
          type="number"
          value={this.state.query}
          onChange={this.handleInputChanged}
        ></input>
      </div>
    );
  }
}

export { NumberOfEvents };
