
const { ObjectId } = require('bson');

const { MongoClient, objectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'inventory-system'


async function connect() {

  const client = await MongoClient.connect(connectionURL)

  if (!client) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

  const insertPromise = db.collection('categories').insertOne({
    name: 'Frozen'
  })

  insertPromise.then((result) => {
    console.log('Category inserted')
  }).catch((error) => {
    console.log('Unable to insert category')
  })

}
connect()