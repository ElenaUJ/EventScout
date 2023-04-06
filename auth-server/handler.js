// Code for serverless functions here

// Import of required packages
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

// SCOPES allows to set access levels; for now, read only, because I have no rights to update calendar myself
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Credentials are all values required to get access to calendar
// process.env means the value is in config.json file, so API secrets remain hidden
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://elenauj.github.io/EventScout/'],
  javascript_origins: ['https://elenauj.github.io', 'http://localhost:3000'],
};
// Destructuring of credentials, to extract specific properties into their own variables
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

// Creation and call of new instance of the google.auth.OAuth2 method, accepting client ID, client scredt and redirect URL as parameters
// Question: Why is this not within the getAuthUrl function, just like in the getAccessToekn function?
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// The first step in the OAuth process is to generate an URL to users can log in with Google and be authorized to see calendar events data
// After logging in they will receive a code as an URL parameter
// async keyword indicated that function will return promise
// Question: I was trying to find out about async, and ChatGPT says it's not necessary since we don't use the await keyword and it doesn't return a promise? I find is very hard to grasp async/await, it hasnt't really been introduced at all.
module.exports.getAuthURL = async () => {
  // oAuth2Clienthelps to seamlessly retrieve access token, refresh, retry
  // generateAuthUrl method needs access type and scope in an object
  // Scopes array passed to the scope option
  // Any scopes must be enables in the "OAuth consent screen" settings in project on Google console. Also, any passed scopes are the ones users will see when consent screen is displayed to them
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      // Question: According to ChatGPT I cannot set origin to * and credentials to true...
      // Any domain is allowed access
      'Access-Control-Allow-Origin': '*',
      // Allows credentials to be send in cross-origin requests
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  // Has to be done for every serverless function because there is no memory of any instancs of OAuthClient created before, even not if it was globally
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Decoding authorization code extracted from URL query (event paramter gets passed from the AWS API gateway associated with the function, in this case info about the HTTP requiest like headers, query parameters and path parameters)
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    // Exchange authorization code for access token with callback to be executed after the exchange
    // Callback is an arrow function with the results as parameters: err and token, there to handle results of the exchange
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
    });
  })
    .then((token) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};
