Feature: Specify Number of Events

Scenario: When user hasn't specified a number, 32 is the default number
Given the user has not specified the number of events they want to see per city
When the user receives the list of events in that city
Then a number of 32 events should be displayed by default

Scenario: User can change the number of events they want to see
Given the user received a list of 32 events per selected city
When the user wants to see more or less events per city
Then they should be able to modify the event number