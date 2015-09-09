var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/write_start_app");

module.exports.Submission = require("./user.js")
module.exports.User = require("./user.js");





