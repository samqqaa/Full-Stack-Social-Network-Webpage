// this is model.js 
var mongoose = require('mongoose')
require('../db.js')

var userSchema = new mongoose.Schema({
	username: String, 
	hash:String, 
	salt:String,
	auth: [],
    authId: String
})


var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [String],
	email: String,
	dob: String,
	zipcode: String,
	avatar: String
})

var commentSchema = new mongoose.Schema({
	commentId: String,
	author: String,
	date: String, 
	text: String
	
})

var articleSchema = new mongoose.Schema({
	author: String, 
	img: String, 
	date: String,
	text: String,
	comments: [ commentSchema ]
})




exports.Article = mongoose.model('articles', articleSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Users = mongoose.model('users', userSchema)
exports.Comment = mongoose.model('comments', commentSchema)