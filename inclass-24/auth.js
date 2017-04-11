const md5 = require('md5')
const salt = Math.random()
const password = 123
let userlist = [
	{username: 'Sam', salt: salt, hash: md5(salt + '' + password)}
]
const cookieKey = 'sid'

const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = "b091268430e05c03945fd13f600f6193"
const clientID = "264020654007595"
const config = {clientSecret, clientID, callbackURL}

const request = require('request')
const qs = require('querystring')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
var users = []
var redis = require('redis').createClient('redis://h:p832560d9a01976f5441856edc3ded9622e39aa63f12c0b069d657ff41b205db4@ec2-34-206-56-185.compute-1.amazonaws.com:40679')

// serialize the user for the session
passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null, user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			// register the user in our system
			return done(null, profile);
		})
	}
))

function logout(req, res) {
	req.logout()
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	var sid = req.cookies[cookieKey]
	if(!sid) {
		return res.status(401)
	} else {
		redis.hgetall(sid, function(err, userObj) {
			console.log(sid + 'mapped to' + userObj)
			if(userObj) {
				req.username = userObj.username
				next()
			} else {
				return res.status(401)
			}
		})
	}
}

function profile(req, res) {
	res.send(req.user)
}

function fail(req, res) {
	res.send('failed to login')
}

function register(req, res) {
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email
	const dob = req.body.dob
	const zipcode = req.body.zipcode
	if(!username || !dob || !zipcode || !email || !password){
		res.status(400).send({result:'Please fill in all fields'})
		return
	}
	res.status(200).send({result: 'success',username: username});	

    // randon salt number
	const hash = md5(salt + '' + password);
	userlist.push({username: username, salt: salt, hash: hash});
	res.send({username: username, salt: salt, hash: hash});	
}


function isRegistered(req, obj) {
	return obj.hash === md5(obj.salt + '' +req.body.password)
}

function generateCode(userObj) {
	return userObj.hash;
}
function hello(req, res) {
     res.send({ hello: 'worldtest' })
}

function login(req, res) {
	const username = req.body.username
	const password = req.body.password
	var sid = md5(salt)
	if(!username || !password) {
		res.status(400).send({result: 'Please fill in both fields'})
		return
	}
    var userObj = userlist.filter(r => { return r.username == username })[0]
	if(!userObj || !isRegistered(req, userObj)) {
		res.sendStatus(401)
		return
	}
	// cookie lasts for 1 hour
	res.cookie(cookieKey, generateCode(userObj), 
		{MaxAge: 3600*1000, httpOnly: true })
	res.send({ username: username, result: 'success'})
	redis.hmset(sid, userObj)

	console.log(sid)
}

function logout(req, res) {
	session_id = null
	res.send('OK');
}

function putPassword(req, res) {
    const password = req.body.password;
    if(!password){
        res.sendStatus(400)
        return
    }
    res.send({
	        username:'hw22', 
	        status:'Becoming a web dever'
	    })
}

module.exports = app => {
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', logout)
    app.put('/password', putPassword)

	app.use(session({secret:'trytoguessmysecret'}))
	app.use(passport.initialize())
	app.use(passport.session())
    app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
	app.use('/logout',logout)
	app.use('/', hello)
}
