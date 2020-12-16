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
  street: String,
  neighborhood: String,
  city: String,
  zip: {},
  imageUrl: String,
  '3D': Boolean,
  construction: Boolean,
  similarHomes: [Number]
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;