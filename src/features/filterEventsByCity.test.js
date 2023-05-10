import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../App.js';
import { CitySearch } from '../CitySearch.js';
import { mockData } from '../mock-data.js';
import { extractLocations } from '../api.js';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    // Nothing has happened, so can be left empty
    given("user hasn't searched for any city", () => {});
    // Define AppWrapper outside of when-step because it will be needed later
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });
    then('the user should see a list of all upcoming events', () => {
      // Because getEvents() is asynchronous
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    given('the main page is open', () => {
      // Since we are only testing CitySearch, I do not have to mount the App component here
      const locations = extractLocations(mockData);
      CitySearchWrapper = shallow(
        <CitySearch locations={locations} updateEvents={() => {}} />
      );
    });
    when('user starts typing in the city textbox', () => {
      const eventObject = { target: { value: 'Berlin' } };
      CitySearchWrapper.find('.city').simulate('change', eventObject);
    });
    then(
      "the user should see a list of cities (suggestions) that match what they've typed",
      () => {
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
      }
    );
  });

  test('User can select a city from the suggested list.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user was typing "Berlin" in the city textbox', async () => {
      // async/await is used here, because the AppWrapper has to be fully mounted before simulating the user event
      AppWrapper = await mount(<App />);
      const eventObject = { target: { value: 'Berlin' } };
      AppWrapper.find('.city').simulate('change', eventObject);
    });
    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      // Expect has to be used here, because condition has to be met for the next steps to be performed
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });
    when(
      'the user selects a city (e.g., "Berlin, Germany") from the list',
      () => {
        AppWrapper.find('.suggestions li').at(0).simulate('click');
      }
    );
    then(
      'their city should be changed to that city (i.e., "Berlin, Germany")',
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
      }
    );
    // and('the list of suggestions should disappear', () => {});
    and(
      'the user should receive a list of upcoming events in that city',
      () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(1);
      }
    );
  });
});
