import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { CitySearch } from '../CitySearch.js';
import { NumberOfEvents } from '../NumberOfEvents.js';
import { mockData } from '../mock-data.js';
import { extractLocations, getEvents } from '../api.js';

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

// Separating integration tests from unit tests (best practice)
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    // Step necessary because if both App state and EventList prop could both be undefined
    expect(AppEventsState).not.toEqual(undefined);
    // Question: Could I write .prop('events') instead? The test still works. That's what we did in one CitySearch unit test.
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    // Important to unmount because otherwise tests will affect each other
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
    // CitySearch suggestions state to have all available cities (without see all cities)
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    // Returning a random integer between 0 and suggestions.length -1
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    // Mimicking the click by calling instance() and then calling the component's function directly
    // Await to pause code until function exectuion is completed
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    // Getting all events from API (or mock data) asynchronously
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
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    const AppWrapperEventCountState = AppWrapper.state('eventCount');
    expect(AppWrapperEventCountState).toBe(20);
    AppWrapper.unmount();
  });

  // Question: Not sure if this test is set up wisely or if I am missing a point... I did not include the location part for the final events state since this was tested before. Is that ok?
  // Question: I could only get that test to pass with the timeout. The await keyword wasn't enough because it only waited until the getEvents() promise was resolved. Is there a better way to handle this?
  test('Number of events passed to EventList matches eventCount set by the user', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 2 } };
    NumberOfEventsWrapper.find('.number-of-events').simulate(
      'change',
      eventObject
    );
    const AppEventCountState = AppWrapper.state('eventCount');
    await AppWrapper.instance().updateEvents('all');
    setTimeout(async () => {
      const AppEventsState = AppWrapper.state('events');
      expect(AppEventsState).toHaveLength(AppEventCountState);
      expect(AppEventsState).toEqual(mockData.slice(0, AppEventCountState));
      AppWrapper.unmount();
    }, 1000);
  });
});
