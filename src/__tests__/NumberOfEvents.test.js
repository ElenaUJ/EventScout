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
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('default number of events is 32', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(
      32
    );
  });

  test('renders number input correctly', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toBe(
      query
    );
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      query: 32,
    });
    const eventObject = { target: { value: 20 } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate(
      'change',
      eventObject
    );
    expect(NumberOfEventsWrapper.state('query')).toBe(20);
  });
});
