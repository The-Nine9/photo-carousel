var faker = require('faker');

var n = 100; //size of most the random arrays below

//generate array of random prices
var minPrice = 100000;
var maxPrice = 10000000;
var priceIncrement = (maxPrice - minPrice) / n;
var prices = Array(n).fill().map((ele, i) => {
  return minPrice + Math.floor(priceIncrement * i);
});

//generate arrays of random room and bath counts
var roomCounts = Array(9).fill().map((ele, i) => ++i);
var bathCounts = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

//generate array of random square footage
var minSqft = 800;
var maxSqft = 10000;
var sqftIncrement = (maxSqft - minSqft) / n;
var sqfts = Array(n).fill().map((ele, i) => {
  return minSqft + Math.floor(sqftIncrement * i);
});

//generate arrays of random address information
var streets = Array(n).fill().map(() => faker.fake('{{address.streetAddress}} {{address.streetSuffix}}'));
var neighborhoods = Array(n).fill().map(() => faker.address.county());
var cities = Array(n).fill().map(() => faker.address.city());
var states = Array(n).fill().map(() => faker.address.state());
var zipCodes = Array(n).fill().map(() => faker.address.zipCode());

//generate a range of numbers to be used for image urls
var imageUrls = Array(100).fill().map((ele, i) => ++i);

var listing = (id, totalIds) => {

  return {
    insertOne: {
      document: {
        id,
        price: prices[id % prices.length],
        roomCount: roomCounts[id % roomCounts.length],
        bathCount: bathCounts[id % bathCounts.length],
        sqft: sqfts[id % sqfts.length],
        street: streets[id % streets.length],
        neighborhood: neighborhoods[id % neighborhoods.length],
        city: cities[id % cities.length],
        state: states[id % states.length],
        zipCode: zipCodes[id % zipCodes.length],
        imageUrl: `https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+pictures/${imageUrls[id % imageUrls.length]}house.jpg`,
        '3D': Math.random() < .08 ? true : false,
        construction: Math.random() < 0.12 ? true : false,
        similarHomes: Array(15).fill().map(() => {
          return Math.floor(Math.random() * totalIds) + 1;
        }),
      }
    }
  };
}

module.exports = listing;