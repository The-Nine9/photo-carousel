var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  price: Number,
  roomCount: Number,
  bathCount: Number,
  sqft: Number,
  userId: Number,
  street: String,
  neighborhood: String,
  city: String,
  zip: {},
  url: String,
  similarHomes: [Number]
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;