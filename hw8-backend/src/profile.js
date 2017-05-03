// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
const uploadImage = require('./uploadCloudinary')
const Profile = require('./model.js').Profile

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
    const users = req.params.users ? req.params.users.split(',') : [req.user]
	Profile.find({username : {$in : users}}).exec(function(err, objects){
		if (err){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
    	var headlines = []
    	objects.forEach(profile => {
    		headlines.push({username: profile.username, headline: profile.headline})
    	})
    	res.status(200).send({headlines: headlines})
	})
}

const putHeadline = (req, res) => {
	const user = req.user
	Profile.update({username: user}, {$set: {headline: req.body.headline}}, function(err){
		if (err){
			console.log(err)
			return
		}
		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}
			res.send({username : objects[0].username, headline: objects[0].headline})
		})
	})
}

const getDob = (req, res) =>{
	const user = req.params.user ? req.params.user : req.user
	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, dob: objects[0].dob})
	})
}

const getEmails = (req, res) => {
	const user = req.params.user ? req.params.user : req.user
	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, email: objects[0].email})
	})
}

const putEmail = (req, res) => {
	const user = req.user
	Profile.update({username: user}, {$set: {email: req.body.email}}, function(err){
		if (err){
			console.log(err)
			return
		}
		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}
			res.send({username : objects[0].username, email: objects[0].email})
		})
	})
}

const getZipcodes = (req, res) => {
	const user = req.params.user ? req.params.user : req.user
	Profile.find({username: user}).exec(function(err, objects){
		if (err || objects.length == 0){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		res.send({username : objects[0].username, zipcode: objects[0].zipcode})
	})
}

const putZipcode = (req, res) => {
	const user = req.user
	Profile.update({username: user}, {$set: {zipcode: req.body.zipcode}}, function(err){
		if (err){
			console.log(err)
			return
		}
		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(500).send('Internal Server Error')
				return
			}
			res.send({username : objects[0].username, zipcode: objects[0].zipcode})
		})
	})
}
const getAvatars = (req, res) => {
	//users or user
	const users = req.params.user ? req.params.user.split(',') : [req.user]
	Profile.find({username : {$in : users}}).exec(function(err, objects){
		if (err){
			console.log(err)
			res.status(400).send('Bad Request')
			return
		}
		const avatars = objects.map((v)=>{
			return {username: v.username, avatar:v.avatar}
		})
		res.send({avatars})
	})
}

const putAvatar = (req, res) => {
	const user = req.user
	console.log(req)
	const avatar = req.fileurl
	Profile.update({username: user}, {$set: {avatar}}, function(err){
		if (err){
			console.log(err)
			return
		}
		Profile.find({username: user}).exec(function(err, objects){
			if (err || objects.length == 0){
				console.log(err)
				res.status(400).send('no user')
				return
			}
			res.send({username : objects[0].username, avatar: objects[0].avatar})
		})
	})

}

module.exports = (app) => {
	app.get('/', index)
    app.get('/headlines/:users?', getHeadlines)
    app.put('/headline', putHeadline)
    app.get('/dob',getDob)
	app.get('/email/:user?', getEmails)
	app.put('/email', putEmail)
	app.get('/zipcode/:user?', getZipcodes)
	app.put('/zipcode', putZipcode)
	app.get('/avatars/:user?', getAvatars)
	app.put('/avatar', uploadImage('avatar'), putAvatar)      
}