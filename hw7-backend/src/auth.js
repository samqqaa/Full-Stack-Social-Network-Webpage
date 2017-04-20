const md5 = require('md5')
const salt = Math.random()
const password = 123
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
const User = require('./model.js').Users
const Profile = require('./model.js').Profile

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

// function logout(req, res) {
// 	req.logout()
// 	res.redirect('/')
// }

function isLoggedIn(req, res, next) {
    console.log('in isLoggedIn')
	var sid = req.cookies[cookieKey]
	if(!sid) {
        console.log('401')
		return res.status(401).send('isNotLoggegIn')
	} else {
		console.log('is logged in with sid: ' + sid)
        redis.hgetall(sid, function(err, userObj){
            if (err){
                console.log(err)
                res.sendStatus(500)
           console.log('500')
             return
            }
            if(!userObj){
                console.log('user not found')
                res.redirect('/login')
                return
            }
            console.log('user found')
            console.log(sid + " mapped to " + userObj.username)
            req.user = userObj.username
            req.sessionid = sid
            next()
            return
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
    const headline = 'Am a web developer.'
    const avatar = 'http://theredlist.com/media/database/films/cinema/2000/avatar-/027-avatar-theredlist.jpg'
	if(!username || !dob || !zipcode || !email || !password){
		res.status(400).send({result:'Please fill in all fields'})
		return
	}


    User.find({username: username}).exec(function(err, user){
        if (err) {console.log(err)}
        if (user.length > 0){
            res.status(400).send(`${username} is already registered`)
            return
        }
        else{
            const newSalt = md5((new Date()).getTime())
            const newUser = new User({username, hash: md5(password + newSalt), salt: newSalt})
            const newProfile = new Profile({username: username, dob: dob, email: email, zipcode: zipcode, avatar: avatar,
					headline: headline, following: []})

            newProfile.save(function(err, profile){
                if (err){
                    console.log('cannot save profile')
                    console.log(err)
                    return
                }
                console.log(username + ' successfully registered!')
            })
            newUser.save(function(err, user){
                if (err){
                    res.status(400).send(`cannot save username: {username}`)
                }
                console.log('saved successfully')
                res.send({
                    username,
                    status: 'success'
                })
            })
        }
    })

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
    User.find({username: username}).exec(function(err, users){
        if (err){
            console.log(err)
            return
        }
        if (users.length == 0){
            console.log('user not found')
            res.status(401).send('username not found')
            return
        }
        const userObj = users[0]
        console.log(`user found with name ${username}`)
        if (userObj && (md5(password + userObj.salt) === userObj.hash)){
            const sessionKey = md5((new Date()).getTime + userObj.username + userObj.hash)
        	res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
            redis.hmset(sessionKey, userObj)
            console.log('cookie set for an hour')
            res.send({username:userObj.username, status:'success'})
        }
        else{
            res.status(401).send('Unauthorized')
            return
        }
    })
}

function logout(req, res) {
    if (req.sessionid || req.user){
        req.user = null
        redis.del(req.sessionid)
        req.sessionid = null
    }
    res.clearCookie(cookieKey)
    res.status(200).send('OK')
}

function putPassword(req, res) {
    const password = req.body.password;
    if(!password){
        res.sendStatus(400)
        return
    }
    User.find({username: req.user}).exec(function(e,u){
        if (e){
            res.statusSend(500)
            return
        }
        User.update({username: req.user}, {$set: {hash: md5(password + u[0].salt)}}, function(err){
            if (err){
                res.statusSend(500)
                return
            }
            res.send({username: u[0].username, status: 'pswd changed'})
            return
        })
    })
}

module.exports = app => {
    app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
    app.use(isLoggedIn)
	app.put('/logout', logout)
    app.put('/password', putPassword)
	// app.use(session({secret:'trytoguessmysecret'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	// app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	// app.use('/profile', isLoggedIn, profile)
	app.use('/profile', profile)
	// app.use('/fail', fail)
	// app.use('/logout',logout)
	// app.use('/', hello)
}
