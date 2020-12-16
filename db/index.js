var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/trulia';
var db = mongoose.connect(mongoURI, {
  useMongoClient: true,
 });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
    console.log(err);
  });

module.exports = db;
