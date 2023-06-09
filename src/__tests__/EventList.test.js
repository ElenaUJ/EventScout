import React from 'react';
import { shallow } from 'enzyme';
import { EventList } from '../EventList.js';
import { Event } from '../Event.js';
import { mockData } from '../mock-data.js';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);

    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});
