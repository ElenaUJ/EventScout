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
      // Question: So, do I understand it correctly, that I had to mount the App component plus its children just to be able to find the .event element?
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
      // Question: Why don't I have to mount the App component here, if it asks for the main page to be open? Why could't I have done what I did in the first scenario?
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
      // Question: And why do they use async/await here as opposed to the AppWrapper.update() in the first scenario? Because the next step is still within the given-statement? And why don't I just use the CitySearch component?
      AppWrapper = await mount(<App />);
      const eventObject = { target: { value: 'Berlin' } };
      AppWrapper.find('.city').simulate('change', eventObject);
    });
    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      // Question: Why the use of expect there and not in the other given-statements? Because that's still part of the given-statement, right?
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
        // Question: why mockData.length? Shouldn't it be 1, if Berlin ahs been selected?
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      }
    );
  });
});
