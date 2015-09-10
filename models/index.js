var mongoose = require("mongoose");

process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||

mongoose.connect( process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				"mongodb://localhost/write_start_app");

module.exports.Submission = require("./user.js");
module.exports.User = require("./user.js");





