// To handle API calls
import axios from 'axios';
import { mockData } from './mock-data.js';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  // ... spread operator spreads the contents of extractLocations into a new array
  var locations = [...new Set(extractLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  // Request to tokeninfo endpoint for OAuth2.0 protocol
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getEvents = async () => {
  // Start progress bar (library should be installed and imported??)
  NProgress.start();

  if (window.location.href.startsWith('https://localhost')) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://0mf3lzz5mc.execute-api.ca-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);

    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  // Checking whether user already has an access token
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  // If there is no token, check for authorization code
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');

    if (!code) {
      // If there is no code, user is redurected to google authorization screen
      const results = await axios.get(
        'https://0mf3lzz5mc.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const { authUrl } = results.data;
      // Redirection takes place here
      return (window.location.href = authUrl);
    }

    return code && getToken(code);
  }

  return accessToken;
};
