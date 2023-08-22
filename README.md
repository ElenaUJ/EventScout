# EventScout App

## Table of Contents

- [Overview](#overview)
- [Links](#links)
- [Features, User Stories and BDD Scenarios](#features-user-stories-and-bdd-scenarios)
- [Process](#process)
  - [Main Technologies and Dependencies](#main-technologies-and-dependencies)
  - [Testing](#testing)
  - [Linting and Formatting](#linting-and-formatting)
  - [Progressive Web App (PWA)](#progressive-web-app-pwa)
- [Data Flow: Google Calendar API and Serverless Authorization](#data-flow-google-calendar-api-and-serverless-authorization)
  - [Google Verification](#google-verification)

## Overview

![Screenshot of EventScout UI](/public/Screenshot_EventScout.png?raw=true)

EventScout is an app which helps users to research, schedule and attend web development events in their city.

The app is built using [test/behaviour-driven development](#features-user-stories-and-bdd-scenarios) techniques (TDD/BDD) and is designed as a serverless, [progressive web app (PWA)](#progressive-web-app-pwa). It uses the [Google Calendar API](#data-flow-google-calendar-api-and-serverless-authorization) to retrieve upcoming events, with access authorization being handled by the serverless backend powered by AWS Lambda. This backend verifies consumer keys and issues a token that allows users to access the API. The app also works offline using cached data.

## Links

- [Live site URL](https://elenauj.github.io/EventScout/)
- [Code URL](https://github.com/ElenaUJ/EventScout)

## Features, User Stories and BDD Scenarios

### Feature 1: Filter Events by City

**User story**

**As a** user
**I should be able to** filter events by city
**So that** I can see the list of events that take place in that city

**Scenarios**

**Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.**
**Given** user hasn’t searched for any city
**When** the user opens the app
**Then** the user should see a list of all upcoming events

**Scenario 2: User should see a list of suggestions when they search for a city.**
**Given** the main page is open
**When** user starts typing in the city textbox
**Then** the user should see a list of cities (suggestions) that match what they’ve typed

**Scenario 3: User can select a city from the suggested list.**
**Given** the user was typing “Berlin” in the city textbox
**And** the list of suggested cities is showing
**When** the user selects a city (e.g., “Berlin, Germany”) from the list
**Then** their city should be changed to that city (i.e., “Berlin, Germany”)
**And** the list of suggestions should disappear
**And** the user should receive a list of upcoming events in that city

### Feature 2: Show/Hide an Event's Details

**User story**

**As a** user
**I should be able to** show and hide event details
**So that** I can get more information specifically about events of interest.

**Scenarios**

**Scenario 1: An event element is collapsed by default**
**Given** the user has just selected the city for which they wanted to browse events
**When** the user receives the list of events in that city
**Then** all event elements should be collapsed by default

**Scenario 2: User can expand an event to see its details**
**Given** the user has identified an event of interest
**When** the user clicks on that event element
**Then** the element should expand
**And** display its details

**Scenario 3: User can collapse an event to hide its details**
**Given** the user has obtained all information they need about the event
**When** the user clicks on that event element
**Then** the element should collapse
**And** hide its details again

### Feature 3: Specify Number of Events

**User story**

**As a** user
**I should be able to** specify the number of displayed events
**So that** I have control about how many events I want to see.

**Scenarios**

**Scenario 1: When user hasn’t specified a number, 32 is the default number**
**Given** the user has not specified the number of events they want to see per city
**When** the user receives the list of events in that city
**Then** a number of 32 events should be displayed by default

**Scenario 2: User can change the number of events they want to see**
**Given** the user received a list of 32 events per selected city
**When** the user wants to see more or less events per city
**Then** they should be able to modify the event number

### Feature 4: Use the App When Offline

**User story**

**As a** user
**I should be able to** use the app when offline
**So that** I can access event information even when there is not internet available.

**Scenarios**

**Scenario 1: Show cached data when there’s no internet connection**
**Given** the user lost internet connection
**When** the user accesses the app
**Then** chached data should still be available
**And** an error message should appear

### Feature 5: Data visualization

**User story**

**As a** user
**I should be able to** view a chart which displays the number of upcoming events in each city
**So that** I can quickly identify and compare the number of events of different cities.

**Scenarios**

**Scenario 1: Show a chart with the number of upcoming events in each city**
**Given** the user has not selected a city
**When** the user wants to compare events between cities
**Then** they should be able to access a chart with the number of upcoming events in each city

## Process

### Main Technologies and Dependencies

**Technologies:**

- React: A JavaScript library for building user interfaces.
- AWS Lambda: A serverless computing service.
- Axios: A popular HTTP client library used for making asynchronous requests.
- Recharts: A charting library for React that provides customizable and interactive charts.
- Atatus: An application performance management tool.

**Dependencies:**

For a complete list of dependencies, please refer to the [package.json](./package.json) file.

### Testing

This project follows a test-driven approach to ensure the quality and reliability of our application. We utilized a range of testing utilities, including:

- Jest: A widely adopted JavaScript testing framework that provides a robust foundation for unit testing React components.
- Enzyme: A JavaScript testing utility for React that facilitates testing of component behaviors and interactions.
- Jest-Cucumber: A library that combines Jest and Cucumber, enabling the creation of behavior-driven development (BDD) tests with a natural language syntax.
- Puppeteer: A Node.js library that facilitates end-to-end testing of web applications.

### Linting and Formatting

- ESLint Rules:

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

- Prettier configuration: [View configuration](https://stackoverflow.com/questions/55430906/prettier-single-quote-for-javascript-and-json-double-quote-for-html-sass-and-c)

### Progressive Web App (PWA)

This app utilizes service workers to enable offline support and caching of app resources. With a manifest file and responsive design implementation, users can install and launch the app as a standalone application on compatible devices, while enjoying a seamless experience across different screen sizes and devices. Taken together, these features make EventScout fully compliant with PWA specification.

## Data Flow: Google Calendar API and Serverless Authorization

The EventScout App uses data stored in CareerFoundry's Google Calendar account through the Google Calendar API. To access the protected API, the app employs an authorization service deployed on AWS Lambda, a serverless computing platform. By submitting its credentials to the Lambda function, the app undergoes a validation process. Once authenticated, the app obtains a JSON Web Token (JWT) for subsequent requests to the Google Calendar API.

### Google Verification

The app is currently undergoing the verification process with Google to allow unrestricted public access. During this verification process, users are advised to exercise caution. However, as the developer (ulbrichtjones@gmail.com), I assure you that the app is safe and trustworthy. Please feel free to trust the developer and proceed to use the app with confidence. If you have any concerns or questions, please don't hesitate to reach out to me directly at ulbrichtjones@gmail.com. Thank you for your understanding and support.
