import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../App.js';
import { EventList } from '../EventList.js';
import { Event } from '../Event.js';
import { mockData } from '../mock-data.js';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
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

  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given(
      'the user has just selected the city for which they wanted to browse events',
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
