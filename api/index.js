const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node application." });
});

app.use((req, res, next) => {
  console.log("");
  console.log("URL : " + req.url);
  console.log("Header : " + JSON.stringify(req.headers));
  console.log("Body : " + JSON.stringify(req.body));
  console.log("Query : " + JSON.stringify(req.query));
  next();
});

require("./app/routes")(app);

app.use(function (req, res, next) {
  res.end("Didn't match a route!");
  next();
});

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});
