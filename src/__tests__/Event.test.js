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
    expect(EventWrapper.find('.title')).toHaveLength(1);
  });

  test('render correct title for event', () => {
    expect(EventWrapper.find('.title').text()).toBe('Learn JavaScript');
  });

  test('event item renders short info', () => {
    expect(EventWrapper.find('.short-info')).toHaveLength(1);
  });

  test('short info renders correctly', () => {
    const shortInfoHtml =
      '<p class="short-info">Tue, May 19, 2020, 4:00 PM GMT+2 (Europe/Berlin)<br/>@Learn JavaScript | London, UK</p>';
    expect(EventWrapper.find('.short-info').html()).toBe(shortInfoHtml);
  });

  test('details button is rendered', () => {
    expect(EventWrapper.find('.btn-details')).toHaveLength(1);
  });

  test('details are hidden per default', () => {
    EventWrapper.setState({ isVisible: false });
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('details are toggled when details button is clicked', () => {
    EventWrapper.setState({ isVisible: false });
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(1);
    EventWrapper.find('.btn-details').simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('button text toggles depending on details visibility', () => {
    EventWrapper.setState({ isVisible: false });
    expect(EventWrapper.find('.btn-details').text()).toBe('Show Details');
    EventWrapper.setState({ isVisible: true });
    expect(EventWrapper.find('.btn-details').text()).toBe('Hide Details');
  });

  test('details are rendered correctly', () => {
    const eventDetailsHtml =
      '<div class="details"><h3>About event:</h3><a href="https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20">See details on Google Calendar</a><p>Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.</p></div>';
    EventWrapper.setState({ isVisible: true });
    expect(EventWrapper.find('.details').html()).toBe(eventDetailsHtml);
  });
});
