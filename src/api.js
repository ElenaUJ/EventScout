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

export const checkToken = async (accessToken) => {
  // Request to tokeninfo endpoint for OAuth2.0 protocol
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

// To remove the code from the URL once it's been accessed
const removeQuery = () => {
  // Checks if browser supports HTML5 history API and if the current URL has a path (and not just domain name), otherwise the app would break if the URL was replaced
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    // pushState method replaces current URL with the new URL (first two parameters are stateObject and title, which we don't need)
    window.history.pushState('', '', newurl);
    // Question: But if the browser doesn't support the HTML5 history API, it wouldn't be able to use the pushState() method, and result in an error, correct?
    // So why does this else statement exist then?
    // To check the path (and why would no path exist?)?
    // Then why check for the pushState method at all? I'm confused.
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://0mf3lzz5mc.execute-api.ca-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  // If there is an access token, store it in local storage
  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

export const getEvents = async () => {
  // Start progress bar
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  // Checks if user is offline, do it before checking for token
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    console.log(
      'went offline, and events are: ' + data ? JSON.parse(data).events : []
    );
    return data ? JSON.parse(data).events : [];
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
      // Local storage can only store strings
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
      // If there is no code, user is redirected to google authorization screen
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
