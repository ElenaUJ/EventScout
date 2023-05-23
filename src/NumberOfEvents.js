import React, { Component } from 'react';
import { ErrorAlert } from './Alert.js';

class NumberOfEvents extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      errorText: '',
    };
  }

  handleInputChanged = (event) => {
    const input = event.target.value;
    this.setState({
      query: input,
    });
    let query;
    if (input > 100) {
      query = 100;
      this.setState({ errorText: 'Please select a number from 1 to 100' });
    } else if (input < 1) {
      query = 32;
      this.setState({ errorText: 'Please select a number from 1 to 100' });
    } else {
      query = input;
      this.setState({ errorText: '' });
    }
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
          placeholder={'number of events'}
        ></input>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export { NumberOfEvents };
