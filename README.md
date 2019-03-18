[![Netlify Status](https://api.netlify.com/api/v1/badges/1b1f26c8-1856-4d52-93ec-1f5501f08b7d/deploy-status)](https://app.netlify.com/sites/stations/deploys)

# Stations.ie

Progressive Web App

Live public transport departure and arrival info for stations across Ireland

Currently supports:
- Irish Rail stations

Planned Support:
- Bus Éireann stations

[Live Site (beta)](https://www.stations.ie/)

## Development server

1. Run `npm install` to install all dependencies.
2. Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
3. Navigate to `src/flaskServer`, install Python packages `pip install -r requirements.txt`, and run the Flask server `python rail_server.py`.

Alternatively, Run `npm run start:mock` for a dev server that uses mock data. Navigate to `http://localhost:4200/` (no need to run the Flask server).

## Build

This project uses Netlify to build production app every time a PR is merged to master branch. Also, builds PR previews so changes can be checked before merging to master.

## Running tests

Run `npm test` to execute the unit tests.

Run `npm run test:coverage` to generate test coverage.

Run `npm run lint` to execute tslint.

Lint and unit tests run automatically on `git push` and all needs to pass before the branch is actually pushed to remote.
