Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given the user has just selected the city for which they wanted to browse events
When the user receives the list of events in that city
Then all event elements should be collapsed by default

Scenario: User can expand an event to see its details
Given the user has identified an event of interest
When the user clicks on the "see details" button
Then the element should expand
And display its details

Scenario: User can collapse an event to hide its details
Given the user has obtained all information they need about the event
When the user clicks on the "hide details" button
Then the element should collapse
And hide its details again