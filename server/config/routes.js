// Require the Mongoose Module
var mongoose = require('mongoose');

// Load the User model that was created in the server.js
var User = mongoose.model('User')

// Load the Comment model that was created in the server.js
var Comment = mongoose.model("Comment");

// Access the controller's JS file
var messsageboard = require('../controllers/controller.js');

module.exports = function(app) {
  // Root:
  app.get('/', function(req, res) {
    messsageboard.show(req, res);
  })

  // Add User Request
  app.post('/process', function(req, res) {
    messsageboard.add(req, res);
  })

  // Comment Data
  app.post('/comment/:id', function(req, res) {
    messsageboard.create(req, res);
  })
}
