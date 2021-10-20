const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const findUser = require("./helpers/findUser");
const authorizationMiddleware = require("./midlewares/authorization");

const app = express();
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if (findUser(username, password)) {
    const token = jwt.sign({}, MY_SECRET_KEY);
    res.send({
      token,
    });
  } else {
    res.status = 401;
    res.send({
      token: null,
    });
  }
});

app.get("/", authorizationMiddleware, (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log("Server started on", port);
});
