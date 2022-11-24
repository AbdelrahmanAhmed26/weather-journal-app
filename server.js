// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Port = 8050;
const cors = require("cors");
app.use(cors());

// Require Express to run server and routes
app.get("/get", (req, res) => {
  res.send(projectData);
});

// Start up an instance of app

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
const server = app.listen(Port, Listining);
function Listining() {
  console.log("Server is Running");
  console.log(`https://localhost:${Port}`);
}

app.post("/sendPost", (req, res) => {
  projectData = req.body;
  res.send(["Data Recived"]);
});
