const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { promisify } = require('util');

const config = require('../config.json');
const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const geojsonPath = path.resolve(__dirname, '..', 'geojsons');
const screenshotPath = path.resolve(__dirname, '..', 'screenshots');
const htmlPath = `file://${__dirname}/index.html`;

start();

async function start() {
  const geojsonPaths = await readDirAsync(geojsonPath);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`found ${geojsonPaths.length} geojson files at ${geojsonPath}`);

  await page.goto(htmlPath);
  await page.evaluate(initMap, config);

  for (let [index, filePath] of geojsonPaths.entries()) {
    const geojsonRaw = await readFileAsync(`${geojsonPath}/${filePath}`);
    const geojson = JSON.parse(geojsonRaw);

    await page.evaluate(addGeojsonLayer, geojson);
    await page.screenshot({ path: `${screenshotPath}/geojson_${index}.png` });
    console.log(`make screenshot for: ${filePath}`);
  }

  await browser.close();
}

function initMap(config) {
  return new Promise((yep, nope) => {
    const map = L.map('map').setView(config.center, config.zoom);
    const tileLayer = L.tileLayer(config.tileLayerUrl).addTo(map);

    window.map = map;

    tileLayer.on('load', yep);
  });
}

function addGeojsonLayer(geojson) {
  if (typeof geojsonLayer !== 'undefined') {
    geojsonLayer.clearLayers();
  }
  geojsonLayer = L.geoJSON(geojson).addTo(map);
}