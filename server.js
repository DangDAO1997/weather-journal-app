// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.listen(8000, ()=>{
    console.log("Listening on port 8000");
})

app.get("/project/data", (req,res)=>{
    res.send(projectData)
});

app.post("/project/data", (req,res)=>{
   projectData = req.body;
   res.status(200).json({
    status: "ok"
   });
});