"use strict";

const continent = require("./continentRouter");
const country = require("./countryRouter");
const error = require("./error");

let routes = [...continent, ...country, ...error];

module.exports = routes;
