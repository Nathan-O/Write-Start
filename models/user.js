var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// *** SCHEMAS *** //

// Submission Schema (Embedded)
var Submission = new Schema({
      title: String,
      genre: String,
      file: String,
      timestamp: {type: Date, default: Date.now()},
      //suggestedEdits: [Edits]
      });               // ^ reference

// User Schema
var UserSchema = new Schema({
              userName: String,
              firstName: String,
              lastName: String,
              email: String,
              passwordDigest: String, 
              dateCreated: {type: Date, default: Date.now()},
              submissions: [Submission]
              });           // ^ Embedded



// *** STATICS *** //

  //creates user with hasked password
UserSchema.statics.createSecure = function(userName, firstName, lastName, email, password, callback){
  console.log("In createSec");
  var _this = this;
  bcrypt.genSalt(function (err, salt){
    bcrypt.hash(password, salt, function (err, hash){
      var user = {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          passwordDigest: hash,
          dateCreated: Date.now()
      };
        //create new user with now hashed password
      _this.create(user, callback);
    });
  });
};

// to authenticate user (login)
UserSchema.statics.authenticate = function (email, password, callback){
  console.log("Email: " + email + ", Pass: " + password);

  this.findOne({email: email}, function (err, user){
    if (user === null) {
      console.log("It was null");

      callback("Sorry, no user was found with that email", null);
    } else if (user.checkPassword(password)){
      console.log("Worked");

      callback(null, user);
    } else {
      console.log("Wrong pass");
      callback("Password Incorrect", user);
    };
  });
};

// *** METHODS *** //

//compare entered password against hashed passwordDigest
UserSchema.methods.checkPassword = function (password){
    //compares password, returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};

// Define models
var Submission = mongoose.model("Submission", Submission)
var User = mongoose.model("User", UserSchema);

// export model
module.exports = Submission;
module.exports = User;








