import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { CitySearch } from '../CitySearch.js';
import { NumberOfEvents } from '../NumberOfEvents.js';
import { mockData } from '../mock-data.js';
import { extractLocations, getEvents } from '../api.js';

// Unit tests
describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// Integration tests
describe('<App /> integration', () => {
  // Mitigates  window.ResizeObserver is not a constructor error as suggested here: https://github.com/maslianok/react-resize-detector/issues/145
  const { ResizeObserver } = window;
  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).prop('events')).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "see all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('NumberOfEvents value change updates eventCount state in App component', () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 20 } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate(
      'change',
      eventObject
    );
    const AppWrapperEventCountState = AppWrapper.state('eventCount');
    expect(AppWrapperEventCountState).toBe(20);
    AppWrapper.unmount();
  });

  test("if NumberOfEvents input is higher than 100, set App's eventCount to 100", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 101 } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate(
      'change',
      eventObject
    );
    const AppEventCountState = AppWrapper.state('eventCount');
    expect(AppEventCountState).toBe(100);
    AppWrapper.unmount();
  });

  test("if NumberOfEvents input is lower than 1, set App's eventCount to 32", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: -1 } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate(
      'change',
      eventObject
    );
    const AppEventCountState = AppWrapper.state('eventCount');
    expect(AppEventCountState).toBe(32);
    AppWrapper.unmount();
  });

  test('Number of events passed to EventList matches eventCount set by the user', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 2 } };
    NumberOfEventsWrapper.find('.numberOfEvents').simulate(
      'change',
      eventObject
    );
    const AppEventCountState = AppWrapper.state('eventCount');
    await AppWrapper.instance().updateEvents('all');
    // Waiting for setState to update the events
    await Promise.resolve();
    // Updating component with new state
    AppWrapper.update();
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).toHaveLength(AppEventCountState);
    expect(AppEventsState).toEqual(mockData.slice(0, AppEventCountState));
    AppWrapper.unmount();
  });
});
