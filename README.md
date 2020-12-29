[![Netlify Status](https://api.netlify.com/api/v1/badges/1b1f26c8-1856-4d52-93ec-1f5501f08b7d/deploy-status)](https://app.netlify.com/sites/stations/deploys)

# Stations.ie

Progressive Web App

Live public transport departure and arrival info for stations across Ireland

Currently supports:
- Irish Rail stations

Planned Support:
- Bus Éireann stations

[Live Site (beta)](https://www.stations.ie/)

## Notes

- could not get netlify-lambda to work with ts. Compiling ts to js in lambda/dist in an npm script and watching for changes to ts along with serve lambda and angualr app. Investigate netlify-dev