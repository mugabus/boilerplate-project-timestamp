// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Function to check if date is invalid
const isInvalidDate = (date) => isNaN(date.getTime());

// Your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);

  // If date is invalid, try interpreting the date as a timestamp
  if (isInvalidDate(date)) {
    date = new Date(+req.params.date);
  }

  // If date is still invalid, return an error response
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Otherwise, return the Unix and UTC formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Additional endpoint to get the current date
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
