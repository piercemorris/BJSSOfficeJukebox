const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  require("express-async-errors");
  //require("./startup/db")();
  require("./startup/routes")(server);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Listening on port ${port}...`));
});

//morgan
//path
//cookieparser
//http-errors
