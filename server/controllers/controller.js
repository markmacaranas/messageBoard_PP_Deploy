// Require the Mongoose Module
var mongoose = require('mongoose');

// Load the User model that was created in the server.js
var User = mongoose.model('User')

// Load the Comment model that was created in the server.js
var Comment = mongoose.model("Comment");

module.exports = {
  show: function(req, res) {
    User.find({}).populate('_comments').exec(function(err, users){
      Comment.find({}, function(err, comments) {
        if (!err) {
          res.render('index', {userdata: users, comment: comments});
        }
        else {
          res.redirect('/');
        }
      })
    })
  },

  add: function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var user = new User(req.body);
    user.save(function(err){
      if(err){
        res.render('index', {title: "you have errors!", errors: user.errors})
      }
      else {
        res.redirect('/');
      }
    })
  },

  create: function(req, res) {
    console.log("POST DATA", req.body);
    User.findOne({ _id: req.params.id }, function(err, users) {
      var newComment = new Comment(req.body)
      newComment._message = users._id;
      users._comments.push(newComment);
      newComment.save(function(err) {
        users.save(function(err){
          if(err) { console.log('Error'); }
          else { res.redirect('/'); }
        })
      })
    })
  }


}
