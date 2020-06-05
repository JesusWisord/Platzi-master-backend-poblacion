"use strict";

function getCountry(req, h) {
  console.log(req.mongo.db);
  return "list of country";
}

function getContinent(req, h) {
  return "List of continent";
}

function notFound(req, h) {
  return "Error 404";
}
module.exports = {
  getCountry: getCountry,
  getContinent: getContinent,
  notFound: notFound,
};
