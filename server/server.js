const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

// routers to use
const geoCageRouter = require('./routes/geo.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/geo', geoCageRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log('Listening on port: ', port);
});
