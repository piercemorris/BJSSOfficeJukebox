const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

require("express-async-errors");
require("./startup/db")();
require("./startup/routes")(server);

server.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = app
  .prepare()
  .then(() => {
    return server.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error);
//morgan
//path
//cookieparser
//http-errors
