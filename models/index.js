var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/write_start_app");

module.exports.User = require("./user.js");






