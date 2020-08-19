require("dotenv").config();
const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Paper = require("./models/paper.js")

// the web server will listen to port PORT, if an environment variable PORT is set,
// or port 8080, if there's nothing there
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

// Cross Origin Resource Sharing
app.use(cors());

// middleware for parsing bodies from URL
app.use(bodyparser.urlencoded({extended: true}));

// connect to the CORD19 database, already imported from the csv file
mongoose.connect("mongodb://mongo:27017/cord19", {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
  if (error) {
    return console.error.bind(console, "Error when trying to connect to the CORD-19 database");
  }
  console.log("Successfully connected to the CORD-19 database");
});

// root route
app.get("/", function(req, res){
  res.sendStatus(200);
});

// results route
app.get("/disease_result", function(req, res) {
  // extract the query parameters from the request body
  let reqDisease = req.query.disease;
  let min_publish_time = req.query.min_publish_time;

  console.log(req.query);

  Paper.aggregate([
    // filter out the records that don't contain the requested disease either in their title
    // or their abstract, have no recorded authors or are published before the "date threshold"
  	{$match:
  		{$or: [
  			{ "title": { "$regex": reqDisease, "$options": "i" }},
  			{ "abstract": { "$regex": reqDisease, "$options": "i" }}
  		], authors: {$ne: ""}, publish_time: {$gt: min_publish_time}}
  	},
    // split the sources and the authors by the "; " delimiter
  	{$project:
  		{source: {$split: ["$source_x", "; "]},
  		authors: {$split: ["$authors", "; "]}
  	}},
    // output one record for every source
  	{$unwind: "$source"},
    // group the records based on the source field and calculate the required aggregations
  	{$group: {
      _id: {"sourceName": "$source"},
      sourcePaperCount: {"$sum": 1},
      avgNoOfauthors: {$avg: {$size: "$authors"}},
      stdDevNoOfAuthors: {$stdDevSamp: {$size: "$authors"}}
    }},
    // sort the records by the sourcePaperCount field in descending order
  	{$sort: {sourcePaperCount: -1 }},
    // keep the top 5
    {$limit: 5}
  ])
  // necessary to avoid Out Of Memory errors, enables writing to temporary files
  .allowDiskUse(true)
  .exec(function(error, results) {
  if(error) {
    console.log(error);
  }
  else {
    // just a simple map to get rid of the _id field
    results = results.map(function(i) {
      return {
        sourceName: i._id.sourceName,
        sourcePaperCount: i.sourcePaperCount,
        avgNoOfauthors: i.avgNoOfauthors,
        stdDevNoOfAuthors: i.stdDevNoOfAuthors
      }
    })
    console.log(results);
    res.json(results);
  }
  })
});

// default "page not found" route
app.get("*", function(req, res){
  res.sendStatus(404);
});

// start the server on localhost on port $port
app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}...`));
