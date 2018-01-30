# Map Images Maker

A script for generating static images from a Leaflet map with GeoJSON features

## What is this?

When you run the script it uses [`puppeteer`](https://github.com/GoogleChrome/puppeteer) to make screenshots for every GeoJSON file that is under `geojsons`.
You can adjust the `config.json` for changing `tileLayer`, `zoom` and `center`.

## Usage

```
npm start
```
