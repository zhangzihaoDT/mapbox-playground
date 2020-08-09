import "../css/style.scss";
import { csv } from "d3";
import * as d3 from "d3";
import { parseLocationData } from "./utils";

import mapboxgl from "mapbox-gl";
// or "const mapboxgl = require('mapbox-gl');"

//版权token
mapboxgl.accessToken =
  "pk.eyJ1Ijoiemhhbmd6aWhhbyIsImEiOiJjamN6dDF1bzMwenphMzNuMjlqaG1vOTJlIn0.VdSfOPUC85YcWqs3LZeXmA";
const map = new mapboxgl.Map({
  container: "map", // container id
  center: [105.2115, 31.58],
  zoom: 3,
  bearing: 0,
  pitch: 0,
  style: "mapbox://styles/zhangzihao/ckdinr0l80r951io95mxkr6yu",
  antialias: true,
});