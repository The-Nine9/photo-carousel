var json = require('./jsonObject.js');

var getTime = (start) => {
  var ms = new Date - start;
  if (ms < 10000) { return `${ms} milliseconds`; }
  var seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`;
}

var seedMongo = (collection, listingQty, next) => {
  var start = new Date;
  var listingId = 0;
  var batchSize = 1000;

  var insert = () => {

    var docs = Array(Math.min(listingQty - listingId, batchSize)).fill()
      .map(() => json(++listingId, listingQty));

    collection.bulkWrite(docs, { ordered: false }, (err, result) => {
      if (err) {
        console.log('ERROR: ', err.message);
        return next();
      }

      var percentComplete = listingId / listingQty * 100;
      if (percentComplete % 5 === 0) {
        console.log(`> ${percentComplete}% complete: ${getTime(start)} to insert ${listingId} random documents`);
      }

      listingId < listingQty ? insert() : next();
    });
  }

  insert();
}

var connectAndSeed = (dbName, collectionName, docQty) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017';
  var client = new MongoClient(url, {useUnifiedTopology: true});

  client.connect((err) => {
    if (err) { return console.log('ERROR: ', err.message); }

    console.log(`Connected successfully to mongo's database, '${dbName}'`);
    var collection = client.db(dbName).collection(collectionName);

    collection.drop((err) => {
      if (err) {
        console.log(`> '${collectionName}' collection created`);
      } else {
        console.log(`> Deleted all previous documents from '${collectionName}'`);
      }

      console.log('> Seeding database...')
      seedMongo(collection, docQty, () => {
        client.close(() => console.log('> MongoDB server connection closed'));
      });
    });
  });
}

require('prompt').get([
  {
    name: 'db',
    description: 'Name of mongo database you want to seed',
    default: 'trulia'
  },
  {
    name: 'collection',
    description: 'Name of collection you want to seed into',
    default: 'listings'
  },
  {
    name: 'docQty',
    description: 'How many documents do you want to seed?',
    required: true
  }
], (err, result) => {
  if (err) { return console.log('ERROR: ', err); }

  connectAndSeed(result.db, result.collection, result.docQty);
});
