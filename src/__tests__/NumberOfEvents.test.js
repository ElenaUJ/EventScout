import React from 'react';
import { shallow } from 'enzyme';
import { NumberOfEvents } from '../NumberOfEvents.js';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEventCountState={() => {}} />
    );
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('default number of events is 32', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(
      32
    );
  });

  test('renders number input correctly', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(
      query
    );
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      query: 32,
    });
    const eventObject = { target: { value: 20 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('query')).toBe(20);
  });

  test('number of events input field only accepts numbers, otherwise return default value 32', () => {
    NumberOfEventsWrapper.setState({
      query: 32,
    });
    const eventObject = { target: { value: 'string' } };
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('query')).toBe(32);
  });

  test('if number of events input is higher than 100, return default value 100, if lower than 1 return 1', () => {
    NumberOfEventsWrapper.setState({
      query: 32,
    });
    let eventObject = { target: { value: 101 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('query')).toBe(100);
    eventObject = { target: { value: -1 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('query')).toBe(1);
  });
});
