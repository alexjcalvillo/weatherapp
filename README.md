# PROJECT NAME

Still picking out a name. Leading idea: "Weather...or Not to Run"

## Description

_Duration: (WIP) Current Timeline: 1 Week_

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it?

Currently developing a small weather application using multiple APIs to fetch forecast data and then using that data determine the fairness of your outdoor activity.

Features planned:

- Ideal run conditions. Determined by temperature, humidity, and weather type.
- Personalized condition parameters. Set your own temperature range. Or if you like running in the rain allow that as an option.

The application is currently using OpenCage API for geolocating as well as Web API Navigator Object (for users allowing location tracking on their personal devices). Weather is currently being fetched from the National Weather Service API (subject to change).

<!--
## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused. -->

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example -- Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

<!-- 1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,  -->

1. Open up your editor of choice and run an `npm install`
2. Run `npm run server` in your terminal
3. Run `npm run client` in your terminal
4. The `npm run client` command will open up a new browser tab for you!

## Usage

How does someone use this application? Tell a user story here.

1. Upon arrival the browser will prompt you for permission for your location. This is to determine the first forecast shown, however you do not need to accept to use this application.
2. There is a section to input a zipcode to find locations specifics and forecasts.
3. Once a location is selected the weather will display in the top section.
4. Work in progress.

## Built With

- React.js
- Node.js
- Express
- Reactstrap
- Axios
- PostgreSQL/Postico
- PG

## Acknowledgement

Thank you, you: for being you!
