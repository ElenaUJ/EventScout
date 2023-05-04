import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { Event } from '../Event.js';
import { mockData } from '../mock-data.js';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given(
      'the user has just selected the city for which they wanted to browse events',
      // Question: Not sure if the code accurately reflects my given-statement?
      async () => {
        AppWrapper = mount(<App />);
        await AppWrapper.instance().updateEvents('Berlin, Germany');
      }
    );
    let EventListWrapper;
    when('the user receives the list of events in that city', () => {
      AppWrapper.update();
      EventListWrapper = AppWrapper.find(EventList);
      expect(EventListWrapper.find('.event-list li')).toHaveLength(1);
    });
    // Question: Not sure about this part at all, am I actually looking for the right thing?
    then('all event elements should be collapsed by default', () => {
      const EventWrapper = EventListWrapper.find(Event);
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let EventWrapper;
    given('the user has identified an event of interest', () => {
      const event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
    });
    when('the user clicks on the "see details" button', () => {
      const detailsButton = EventWrapper.find('.details-btn');
      detailsButton.simulate('click');
    });
    then('the element should expand', () => {
      expect(EventWrapper.state('showDetails')).toBe(true);
    });
    and('display its details', () => {
      expect(EventWrapper.find('.details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let EventWrapper;
    given(
      'the user has obtained all information they need about the event',
      () => {
        const event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
        EventWrapper.setState({ showDetails: true });
      }
    );
    when('the user clicks on the "hide details" button', () => {
      const detailsButton = EventWrapper.find('.details-btn');
      detailsButton.simulate('click');
    });
    then('the element should collapse', () => {
      expect(EventWrapper.state('showDetails')).toBe(false);
    });
    and('hide its details again', () => {
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
  });
});
