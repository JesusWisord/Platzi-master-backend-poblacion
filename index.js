'use strict'

const Hapi = require('@hapi/hapi');
const routes = require('./routes/')
const { config } = require('./config/index')


const server = Hapi.server({
  port: config.port,
  host: config.host
});

const asyncfunctioninit = async () => {
  server.route(routes);

  try {
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`);
}

asyncfunctioninit();