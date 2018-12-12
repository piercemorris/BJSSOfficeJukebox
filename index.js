const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

require("express-async-errors");
require("./startup/db")();
require("./startup/routes")(server);

server.get("*", (req, res) => {
  return handle(req, res);
});

module.exports = app
  .prepare()
  .then(() => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch(console.error);
//morgan
//path
//cookieparser
//http-errors
