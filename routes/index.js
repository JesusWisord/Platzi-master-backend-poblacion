"use strict";

const Joi = require("@hapi/joi");
const country = require("../controller/country");

module.exports = [
  {
    method: "GET",
    path: "/country",
    handler: country.getCountry,
  },
  {
    method: "GET",
    path: "/continent",
    handler: country.getContinent,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: country.notFound,
  },
];
