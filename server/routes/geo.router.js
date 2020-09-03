const express = require('express');
const router = express.Router();

router.get('/getlonglat/:zip', (req, res) => {
  const zip = req.params.zip;
  console.log(zip);
  console.log(process.env.REACT_APP_API_KEY);
  axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=${process.env.REACT_APP_API_KEY}`
    )
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
