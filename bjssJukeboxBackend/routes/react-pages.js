app.get("/", (req, res) => {
  return app.render(req, res, "/", req.query);
});

app.get("/about", (req, res) => {
  return app.render(req, res, "/about", req.query);
});
