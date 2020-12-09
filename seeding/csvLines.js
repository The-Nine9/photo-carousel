var fs = require('fs');
var faker = require('faker');

var lines = {
  userHeader: `id,username,password,firstName,lastName,email\n`,
  user: (id) => (
    id + ','
    + faker.internet.userName() + ','
    + faker.internet.password() + ','
    + faker.name.firstName() + ','
    + faker.name.lastName() + ','
    + faker.internet.email() + '\n'
  ),

  listingHeader: `id,price,roomCount,bathCount,sqft,createdAt,updatedAt,addressId,userId\n`,
  listing: (id, listing, userId) => {
    var price = Math.floor(Math.random() * (listing.maxPrice - listing.minPrice) / 1000 + listing.minPrice / 1000)
    price = price * 1000 - (Math.random() > 0.75 ? 0 : 1);

    var today = new Date;
    var createdAt = faker.date.recent(150);
    var updatedAt = ((today - createdAt) / 1000 / 60 / 60 / 24 < 30) ? null : faker.date.between(createdAt, today);

    return (
      id + ','
      + price + ','
      + Math.max(Math.min(Math.floor(price / 100000), listing.maxRoomCount), listing.minRoomCount) + ','
      + (Math.max(Math.min(Math.floor(price / 100000), listing.maxBathCount), listing.minBathCount) + (Math.random() > 0.65 ? 0 : 0.5)) + ','
      + Math.max(Math.floor(price / listing.maxPrice * listing.maxSqft), listing.minSqft) + ','
      + createdAt + ','
      + updatedAt + ','
      + id + ','
      + userId + '\n'
    );
  },

  addressHeader: `id,street,neighborhood,city,state,zip,listingId,userId\n`,
  address: (listingId, userId) => {
    var state = faker.address.state();

    return (
      listingId + ','
      + faker.fake('{{address.streetAddress}} {{address.streetSuffix}}') + ','
      + faker.address.county() + ','//simulates neighborhood
      + faker.address.city() + ','
      + state + ','
      + faker.address.zipCodeByState(state) + ','
      + listingId + ','
      + userId + '\n'
    );
  },

  imageHeader: `id,url,description,listingId\n`,
  image: (id, listingId) => (
    id + ','
    + `https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+pictures/${Math.floor(Math.random() * 100) + 1}house.jpg` + ','
    + faker.lorem.words() + ','
    + listingId + '\n'
  ),
};

module.exports = lines;

