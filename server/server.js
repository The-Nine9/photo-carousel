var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = 8030;
var listingRouter = require('./routers/listing.js');

var publicDir = path.join(__dirname, '../client/dist');

app.use(bodyParser.json());

app.use('/carousel/:id', express.static(publicDir));

// get all similar listings when given a specific id
app.get('*/:id/listing', listingRouter.getOne);

app.listen(8030, () => {
  console.log(`listening on http://localhost:${port}`);
});
