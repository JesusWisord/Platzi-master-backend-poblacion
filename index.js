const Hapi = require('@hapi/hapi');
const { config } = require('./config/index')

require("./database");
const Continents = require("./models/Continents");
const Countries = require("./models/Countries");

const init = async () => {
  const server = new Hapi.server({
    port: config.port,
    host: config.host
  });

  // Agregar los países
  server.route({
    method: 'POST',
    path: '/addcountry',
    handler: async (request, h) => {
      try {
        // Obtener el objeto enviado
        const countries = new Countries(request.payload);
        // guardar ese objeto
        const countriesSave = await countries.save();
        return h.response(countriesSave).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Listar los países
  server.route({
    method: 'GET',
    path: '/countries',
    handler: async (request, h) => {
      try {
        // Buscar todos los objetos
        const countries = await Countries.find();
        return h.response(countries).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Buscar un país por su id
  server.route({
    method: 'GET',
    path: '/country/{id}',
    handler: async (request, h) => {
      try {
        // Buscar por id
        const country = await Countries.findById(request.params.id);
        // await Countries.findOne({year: 2020})
        // await Countries.findOne({ year: 2020 }, { country: 1 })
        return h.response(country).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Editar un país por su id
  server.route({
    method: 'PUT',
    path: '/country/{id}',
    handler: async (request, h) => {
      try {
        // Actualizar enviando primero el id, después el contenido y al final mostrar el objeto actualizado
        const updateCountry = await Countries.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return h.response(updateCountry).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Eliminar un país por su id
  server.route({
    method: 'DELETE',
    path: '/country/{id}',
    handler: async (request, h) => {
      try {
        // Eliminar enviando primero el id
        const deleteCountry = await Countries.findByIdAndDelete(request.params.id);
        return h.response(deleteCountry).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Agregar el continente
  server.route({
    method: 'POST',
    path: '/addcontinent',
    handler: async (request, h) => {
      try {
        // Obtener el objeto enviado
        const continents = new Continents(request.payload);
        // guardar ese objeto
        const continentsSave = await continents.save();
        return h.response(continentsSave).code(201);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Listar los continentes
  server.route({
    method: 'GET',
    path: '/continents',
    handler: async (request, h) => {
      try {
        // Buscar todos los objetos
        const continents = await Continents.find();
        return h.response(continents).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Buscar un continente por su id
  server.route({
    method: 'GET',
    path: '/continent/{id}',
    handler: async (request, h) => {
      try {
        // Buscar por id
        const continent = await Continents.findById(request.params.id)
        // await Continents.findOne({year: 2020})
        // await Continents.findOne({ year: 2020 }, { continent: 1 })
        return h.response(continent).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Editar un continente por su id
  server.route({
    method: 'PUT',
    path: '/continent/{id}',
    handler: async (request, h) => {
      try {
        // Actualizar enviando primero el id, después el contenido y al final mostrar el objeto actualizado
        const updateContinent = await Continents.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return h.response(updateContinent).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Eliminar un continente por su id
  server.route({
    method: 'DELETE',
    path: '/continent/{id}',
    handler: async (request, h) => {
      try {
        // Eliminar enviando primero el id
        const deleteContinent = await Continents.findByIdAndDelete(request.params.id);
        return h.response(deleteContinent).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  // Consultar continentes con los países
  server.route({
    method: 'GET',
    path: '/continent_countries/{id}',
    handler: async (request, h) => {
      try {
        // Eliminar enviando primero el id
        const continentCountries = await Continents.findOne(request.params.id);
        return h.response(continentCountries).code(200);
      } catch (error) {
        return h.response(error).code(500);
      }
    }
  })

  await server.start();
  console.log(`Servidor lanzado en: ${server.info.uri}`);
}

init();