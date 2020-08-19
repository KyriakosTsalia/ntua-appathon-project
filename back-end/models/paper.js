var mongoose = require("mongoose");
//SCHEMA SETUP
var paperSchema = new mongoose.Schema({
  cord_uid: String,
  sha: String,
  source_x: String, // List[String], split with ;(space)
  title: String,
  doi: String,
  pmcid: String,
  pubmed_id: Number,
  license: String,
  abstract: String,
  publish_time: String, // data in yyyy-mm-dd format
  authors: String, // List[String], split with ;(space) , format Last, First Middle
  journal: String,
  mag_id: Number,
  who_covidence_id: String,
  arxiv_id: String,
  pdf_json_files: String,
  pmc_json_files: String,
  url: String,
  s2_id: String
});

module.exports = mongoose.model("Paper", paperSchema, "metadata");
