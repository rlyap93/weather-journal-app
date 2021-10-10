// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;

const server = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`);
};

// Callback to debug

// Initialize all route with a callback function
app.post('/add', callBack);

function callBack(request,response){
  response.send('POST received');
}

// Callback function to complete GET '/all'
app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);
};

// Post Route
const data = [];

app.post('/addWeather', addWeather);

function addWeather(request,response){
  projectData["temperature"] = request.body.temperature;
  projectData["date"] = new Date(request.body.date * 1000);  
  projectData["feeling"] = request.body.feelings;
  
  response.send(projectData);
  console.log(projectData);
};
  
