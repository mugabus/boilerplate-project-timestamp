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

// Helper function to check if date is invalid
const isInvalidDate = (date) => isNaN(date.getTime());

// API endpoint for /api/:date?
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // If no date is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the date is a valid timestamp (all numbers)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, parse the date string as is
      date = new Date(dateString);
    }
  }

  // Check for invalid date and return an error if needed
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Otherwise, return the Unix and UTC date formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
