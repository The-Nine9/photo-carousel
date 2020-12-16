var Listing = require('../models/Listing.js');

var listingController = {

  insert: (document, next = ()=>{}) => {
    Listing.create(document, next);
  },

  find: (criteria, next = ()=>{}) => {
    Listing.find(criteria, next);
  }

  deleteAll: (next = ()=>{}) => {
    Listing.deleteMany({}, next);
  },

};

module.exports = listingController;