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

module.exports = router;
