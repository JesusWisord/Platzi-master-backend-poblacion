'use strict'

const Joi = require('@hapi/joi')
const country = require('../controller/country')

module.exports = [
  {
    method: 'GET',
    path: 'api/country',
    handler: country.getAllData,
  },
  {
    method: 'POST',
    options: {
      validate: {
        payload: {
          name: Joi.string().required(),
        }
      }
    }
    path: 'api/country/create-country',
    handler: country.createCountry,
  }
]