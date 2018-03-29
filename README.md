# Leaflet Mapshot

A script for generating automated screenshots of a local Leaflet map. We used it to create the video in this article https://interaktiv.morgenpost.de/mauerzeichnen-auswertung/.

## How does it work?

When you run the script it uses [`puppeteer`](https://github.com/GoogleChrome/puppeteer) to make screenshots for every GeoJSON file that is under `geojsons`.
You can adjust the `config.json` for changing `tileLayer`, `zoom` and `center`.

## Usage

```
npm start
```
