"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes/");
const { config } = require("./config/index");

const server = Hapi.server({
  port: config.port || 3000,
  host: config.host,
});

async function init() {
  try {
    await server.register({
      plugin: require("hapi-mongodb"),
      options: {
        url:
          "mongodb+srv://db_user_platzimongo:yNhqJka3fAgnBStq@platzimongodbatlas-nktk0.mongodb.net/global-population",
        settings: {
          useUnifiedTopology: true,
        },
        decorate: true,
      },
    });
    server.route(routes);
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`);
}

// lo mando cuando una promesa causa error
process.on("unhandledRejection", (error) => {
  console.error("unhandleRejection", error.message, error);
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error);
});

init();
