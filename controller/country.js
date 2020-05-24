'use strict'

function getAllData (req, h) {
  return ('Data')
}

function createCountry (req, h) {
  console.log(req.payload)
  return ('País creado')
}

module.exports = {
  createCountry: createCountry
}