import React from 'react';
import { shallow } from 'enzyme';
import { Event } from '../Event.js';
import { mockData } from '../mock-data.js';

describe('<Event /> component', () => {
  let event;
  let EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('event item renders event title', () => {
    expect(EventWrapper.find('.name')).toHaveLength(1);
  });

  test('render correct title for event', () => {
    expect(EventWrapper.find('.name').text()).toBe('Learn JavaScript');
  });

  test('event item renders short info', () => {
    expect(EventWrapper.find('.short-info')).toHaveLength(1);
  });

  test('short info renders correctly', () => {
    const date = 'Tue, May 19, 2020, 4:00 PM GMT+2 (Europe/Berlin)';
    const summary = 'Learn JavaScript';
    const location = 'London, UK';
    expect(EventWrapper.find('.short-info').text()).toContain(
      date && summary && location
    );
  });

  test('details button is rendered', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(1);
  });

  test('details are hidden per default', () => {
    EventWrapper.setState({ showDetails: false });
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('details are toggled when details button is clicked', () => {
    EventWrapper.setState({ showDetails: false });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(1);
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('button text toggles depending on details visibility', () => {
    EventWrapper.setState({ showDetails: false });
    expect(EventWrapper.find('.details-btn').text()).toBe('Show Details');
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.details-btn').text()).toBe('Hide Details');
  });

  test('details are rendered correctly', () => {
    const eventLink =
      'https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20';
    const description =
      'Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.';
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.details').html()).toContain(
      eventLink && description
    );
  });
});
