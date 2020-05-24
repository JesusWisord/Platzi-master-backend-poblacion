const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}=retryWrites=true&w=majority`
class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    this.dbName = DB_NAME
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error)
        }
        console.log('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  async getAll (collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    })
  }

  async getOne (collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  async createOne (collection, data) {
    const db = await this.connect()
    const result = await db.collection(collection).insertOne(data)
    return result.insertedId
  }

  async updateOne (collection, id, data) {
    const db = await this.connect()
    const result = await db.collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    return result.upsertedId || id
  }

  async delete (collection, id) {
    const db = await this.connect()
    db.collection(collection).deleteOne({ _id: ObjectId(id) })
    return id
  }
}

module.exports = MongoLib
