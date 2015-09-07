var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// *** SCHEMAS *** //

// User Schema
var UserSchema = new Schema({
              userName: {type: String, required: true},
              firstName: {type: String, required: true},
              lastName: {type: String, required: true},
              email: {type: String, required: true},
              passwordDigest: {type: String, required: true},
              dateCreated: {type: Date, default: Date.now()}
              });



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
UserSchema.statics.authenticate = function (email, callback){
  this.findOne({email: email}, function (err, user){
    if (user === null) {
      callback("Sorry, no user was found with that email", null);
    } else if (user.checkPassword(password)){
      callback(null, user);
    } else {
      callback("Password Incorrect", user);
    };
  });
};

// * METHODS * //

//compare entered password against hashed passwordDigest
UserSchema.methods.checkPassword = function (password){
    //compares password, returns true or false
  return bcrypt.compareSync(password, this.passwordDigest);
};

// Define user model
var User = mongoose.model("User", UserSchema);

// export model
module.exports = User;








