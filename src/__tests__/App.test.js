import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { CitySearch } from '../CitySearch.js';
import { NumberOfEvents } from '../NumberOfEvents.js';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    // Makes sure there is only one EventList component within the App component
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
