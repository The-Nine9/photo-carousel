var fs = require('fs');
var lines = require('./csvLines.js');

var streams = {
  users: fs.createWriteStream('seeding/csvFiles/users.csv'),
  listings: fs.createWriteStream('seeding/csvFiles/listings.csv'),
  addresses: fs.createWriteStream('seeding/csvFiles/addresses.csv'),
  images: fs.createWriteStream('seeding/csvFiles/images.csv')
};

streams.users.write(lines.userHeader);
streams.listings.write(lines.listingHeader);
streams.addresses.write(lines.addressHeader);
streams.images.write(lines.imageHeader);

var drainOk = {
  users: true,
  listings: true,
  addresses: true,
  images: true
};

var generateCSVs = (userQty, listing) => {
  var userId, listingId, imageId;
  userId = listingId = imageId = 0;

  var write = () => {

    while (userId < userQty && drainOk.users && drainOk.listings && drainOk.addresses && drainOk.images) {
      drainOk.users = streams.users.write(lines.user(++userId));
      drainOk.listings = streams.listings.write(lines.listing(++listingId, listing, userId));
      drainOk.addresses = streams.addresses.write(lines.address(listingId, userId));
      drainOk.images = streams.images.write(lines.image(++imageId, listingId));

      var percentComplete = Math.floor(userId / userQty * 100);
      if (percentComplete % 5 === 0) { console.log(percentComplete + '% of CSV files complete'); }
    };
  }
  write();

  if (userId < userQty) {
    if (!drainOk.users) {
      drainOk.users = true;
      return streams.users.once('drain', write);
    }
    if (!drainOk.listings) {
      drainOk.listings = true;
      return streams.listings.once('drain', write);
    }
    if (!drainOk.addresses) {
      drainOk.addresses = true;
      return streams.addresses.once('drain', write);
    }
    if (!drainOk.images) {
      drainOk.images = true;
      return streams.images.once('drain', write);
    }
  }
};

var listing = {
  maxPrice: 1000000,
  minPrice: 100000,
  maxRoomCount: 7,
  minRoomCount: 1,
  maxBathCount: 5,
  minBathCount: 1,
  maxSqft: 8000,
  minSqft: 1000
};

generateCSVs(100, listing);
streams.users.end();
streams.listings.end();
streams.addresses.end();
streams.images.end();