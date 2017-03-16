// Require the Mongoose Module
var mongoose = require('mongoose');

// Schema
var Schema = mongoose.Schema;

// User Schema: & Validation
var UserSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 4 },
 message: { type: String, required: true, maxlength: 100 },
 _comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, {timestamps: true });

// User Path: Validation
UserSchema.path('name').required(true, 'Name cannot be blank');
UserSchema.path('message').required(true, 'Message cannot be blank');
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// Comment Schema:
var CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  _message: {type: Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true });

// Comment Path: Validation
CommentSchema.path('name').required(true, 'Name cannot be blank');
CommentSchema.path('comment').required(true, 'Comment cannot be blank');
mongoose.model("Comment", CommentSchema);
var Comment = mongoose.model("Comment");
