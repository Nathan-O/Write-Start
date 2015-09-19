var db = require('./models');

// db.User.find({}, function(err, users) {
//   if(err){return console.log(err);}
//   users.forEach(function(user) {
//     console.log(user._id);
//     //console.log(user.submissions);
//   });
// });

db.Submission.find({}, function(err, submissions) {
  if(err){return console.log(err);}
  // console.log(submissions)
  submissions.forEach(function(submission) {
    console.log(submission._id);
  });
});

// seedUser = {
//   username: "pxlperfection",
//   firstName: "Justin",
//   lastName: "Castilla",
//   email: "pxlperfection@gmail.com",
//   passwordDigest: "12344567" };
//
//
// db.User.remove({}, function(err, users) {
//   if(err){return console.log(err);}
//     console.log("Everyone Removed");
//     db.User.create(seedUser, function(err, user) {
//       if(err){return console.log(err);}
//       console.log("Successfully added user " + user.firstName);
//     });
// });
//
// db.Submission.remove({}, function(err, users) {
//   if(err){return console.log(err);}
//     console.log("Everyone Removed");
// });
