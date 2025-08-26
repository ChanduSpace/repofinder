const mongoose = require("mongoose");

const RepoSchema = new mongoose.Schema({
  name: String,
  html_url: String,
  description: String,
  stars: Number,
});

module.exports = mongoose.model("Repo", RepoSchema);
