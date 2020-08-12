import "../css/style.scss";
import { csv } from "d3";
import * as d3 from "d3";
import { parseLocationData } from "./utils";

import mapboxgl from "mapbox-gl";
// or "const mapboxgl = require('mapbox-gl');"
import worldData from "../data/world-110m.json";
const moocData = csv("../data/mooc-countries.csv").then((data) => data);
const surfData = csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv").then((data) => data);
console.log(surfData)
//版权token
mapboxgl.accessToken =
  "pk.eyJ1Ijoiemhhbmd6aWhhbyIsImEiOiJjamN6dDF1bzMwenphMzNuMjlqaG1vOTJlIn0.VdSfOPUC85YcWqs3LZeXmA";
const map = new mapboxgl.Map({
  container: "map", // container id
  // center: [105.2115, 31.58],
  ceter: [155.202431, 14.121234],
  zoom: 1.21,
  bearing: 0,
  pitch: 0,
  style: "mapbox://styles/zhangzihao/ckdisy91p0w661iqos2ec6wsz",
  antialias: true,
});

Promise.all([worldData, moocData, surfData]).then(([worldData, moocData]) => {
  console.log(surfData)
  for (var i = 0; i < moocData.length; i++) {
    // Grab State Name
    var dataState = moocData[i].code;
    // Grab data value 
    var dataValue = moocData[i].total;
    // Find the corresponding state inside the GeoJSON
    for (var j = 0; j < worldData.features.length; j++) {
      var jsonState = worldData.features[j].id;
      if (dataState == jsonState) {
        // Copy the data value into the JSON
        worldData.features[j].properties.moocValue = dataValue;
        // Stop looking through the JSON
        break;
      }
    }
  }

  map.on("load", () => {
    map.addSource('population', {
      type: 'geojson',
      data: worldData
    });
    // map.addLayer(populationLayer)
  })

})

let populationLayer = {
  'id': 'state-population',
  'source': 'population',
  'type': 'fill',
  'paint': {
    'fill-color': [
      'interpolate',
      ['linear'],
      ["to-number", ['get', 'moocValue']],
      0,
      '#EEEEEE',
      1,
      '#E4CD59',
      6,
      '#C3C655',
      11,
      '#83B651',
      26,
      '#65A952',
      101,
      '#3C914D',
      1001,
      '#0C6E35',
    ],
    'fill-opacity': 1,
    "fill-outline-color": "#ffffff",
    "fill-translate-anchor": "viewport"
  }
}