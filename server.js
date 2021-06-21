// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const path = require("path");
// Start up an instance of app
const app = express();
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static(path.join(__dirname, "website")));

// Setup Server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

app.get("/project", function (req, res) {
  res.send(projectData);
});

app.post("/project", function (req, res) {
  const { city, feel, date, temperature, icon, country, description } =
    req.body;
  projectData = { temperature, date, feel, city, icon, country, description };
  res.send(projectData);
});
