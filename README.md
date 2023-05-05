# EventScout App

## Table of Contents

- [Overview](#overview)
- [How to Run](#how-to-run)
- [Links](#links)
- [Process](#process)
  - [Technologies used](#technologies-used)
  - [Dependencies](#dependencies)
  - [API](#api)
- [Features, User Stories and BDD Scenarios](#features-user-stories-and-bdd-scenarios)
- [Credits](#credits)

## Overview

EventScout is an app which helps users to research, schedule and attend events in their city.

The app is built using a test-driven development technique (TDD) and is designed as a serverless, progressive web app (PWA). It uses the Google Calendar API to retrieve upcoming events, with access authorization being handled by the serverless backend powered by AWS Lambda. This backend verifies consumer keys and issues a token that allows users to access the API.

The app is still under construction.

## How to Run

## Links

- [Live site URL](https://elenauj.github.io/EventScout/)
- [Code URL](https://github.com/ElenaUJ/EventScout)

## Process

### Technologies Used

- Create React App
- React

### Dependencies

This project has the following dependencies:

- "@testing-library/jest-dom": "^5.16.5",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-scripts": "5.0.1",
- "web-vitals": "^2.1.4",
- "workbox-background-sync": "^6.5.4",
- "workbox-broadcast-update": "^6.5.4",
- "workbox-cacheable-response": "^6.5.4",
- "workbox-core": "^6.5.4",
- "workbox-expiration": "^6.5.4",
- "workbox-google-analytics": "^6.5.4",
- "workbox-navigation-preload": "^6.5.4",
- "workbox-precaching": "^6.5.4",
- "workbox-range-requests": "^6.5.4",
- "workbox-routing": "^6.5.4",
- "workbox-strategies": "^6.5.4",
- "workbox-streams": "^6.5.4"

And dev dependencies:

- "gh-pages": "^5.0.0"

Furthermore, it uses the following linting configuration:

- ESLint rules:

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

- [Prettier configuration](https://stackoverflow.com/questions/55430906/prettier-single-quote-for-javascript-and-json-double-quote-for-html-sass-and-c)

### API Documentation

## Features, User Stories and BDD Scenarios

### Feature 1: Filter Events by City

**User story**

**As a** user
**I should be able to** “filter events by city”
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

**Scenario 2: Show error when user changes the settings (city, time range)**
**Given** the user lost internet connection
**When** the user tries to change settings (e.g. city, time range)
**Then** an error message should appear

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

## Credits
