import React, { Component } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class EventLocations extends Component {
  getData = () => {
    const { locations, events } = this.props;
    const sortedLocations = locations.sort();
    const data = sortedLocations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      // Splitting the locations at the occurrence of comma followed by space, returning an array
      // Then, shift() method gets the first array element, which is the city name
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    return (
      <ResponsiveContainer className="eventLocations">
        <ScatterChart
          margin={{
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis
            type="number"
            dataKey="number"
            name="number of events"
            allowDecimals={false}
          >
            <Label value="number of events" angle={270} />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#2c3e50" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export { EventLocations };
