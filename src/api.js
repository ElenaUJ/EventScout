// To handle API calls
import { mockData } from './mock-data.js';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  // ... spread operator spreads the contents of extractLocations into a new array
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  return mockData;
};
