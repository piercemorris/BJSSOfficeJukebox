const express = require("express");
const app = express();

//morgan
//path
//cookieparser
//http-errors

require("express-async-errors");
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
