var mongoose = require("mongoose");
/*mongoose.connect("mongodb://localhost/write_start_app");*/

mongoose.connect( process.env.MONGOLAB_URI ||
                    process.env.MONGOHQ_URL || 
                    "https://write-start.herokuapp.com" )

module.exports.Submission = require("./user.js")
module.exports.User = require("./user.js");





