const express = require('express');
const router = express.Router();

const axios = require('axios');

/*       GET ROUTES       */
// --------------------- //

// API Call to retreive user location data by ZIPCODE
// Returns a set of search options - FE will handle these
router.get('/getlonglat/:zip/:key', (req, res) => {
  const zip = req.params.zip;
  const key = req.params.key;
  console.log(zip);
  console.log(key);
  axios
    .get(`https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=${key}`)
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// API Call to retrieve an address using Geolocator Web API coordinates
// Turns coordinates into human readable print
router.get('/getlonglat/:lng/:lat/:key', (req, res) => {
  const LNG = req.params.lng;
  const LAT = req.params.lat;
  const key = req.params.key;

  axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${LAT}+${LNG}&key=${key}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = router;
