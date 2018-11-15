const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  require("express-async-errors");
  require("./startup/db")();
  require("./startup/routes")(server);

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Listening on port ${port}...`));
});

//morgan
//path
//cookieparser
//http-errors
