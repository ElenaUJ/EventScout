import React from 'react';
import { mount } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { NumberOfEvents } from '../NumberOfEvents.js';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test("When user hasn't specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given(
      'the user has not specified the number of events they want to see per city',
      () => {
        AppWrapper = mount(<App />);
      }
    );
    when('the user receives the list of events in that city', () => {});
    then('a number of 32 events should be displayed by default', () => {
      expect(AppWrapper.state('eventCount')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user received a list of 32 events per selected city', () => {
      AppWrapper = mount(<App />);
      AppWrapper.setState({ eventCount: 32 });
    });
    let NumberOfEventsWrapper;
    when('the user wants to see more or less events per city', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const eventObject = { target: { value: 1 } };
      NumberOfEventsWrapper.find('.numberOfEvents').simulate(
        'change',
        eventObject
      );
    });
    then('they should be able to modify the event number', () => {
      expect(AppWrapper.state('eventCount')).toBe(1);
      AppWrapper.update();
      expect(AppWrapper.find(EventList).find('.event')).toHaveLength(1);
    });
  });
});