const md5 = require('md5')
const salt = Math.random()
const password = 123
const cookieKey = 'sid'

const config = {
	clientID:'264020654007595', 
	clientSecret:'b091268430e05c03945fd13f600f6193', 
	callbackURL:  'https://samhw777.herokuapp.com/auth/callback',
	// callbackURL:  'http://localhost:3000/auth/callback',
	passReqToCallback: true
}

const request = require('request')
const qs = require('querystring')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
var users = []
if (!process.env.REDIS_URL) {
    process.env.REDIS_URL = 'redis://h:pbec85bbd0ba01819d69fe6a0564121254fe9a991a57a8701184cfc1076bc747b@ec2-34-206-214-110.compute-1.amazonaws.com:13349'
}
const redis = require('redis').createClient('redis://h:pbec85bbd0ba01819d69fe6a0564121254fe9a991a57a8701184cfc1076bc747b@ec2-34-206-214-110.compute-1.amazonaws.com:13349')
const User = require('./model.js').Users
const Profile = require('./model.js').Profile
const Comment = require('./model.js').Comment
const Article = require('./model.js').Article

// serialize the user for the session
passport.serializeUser(function(user, done){
	done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id,done){
	User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})


// Check again
passport.use(new FacebookStrategy(config,
	function(req, token, refreshToken, profile, done){
        const username = profile.displayName + "@facebook"
        User.findOne({username: username}).exec(function(err, user) {
            if(!user || user.length === 0){
                const userObj = new User({username: username, authId: profile.id})
                new User(userObj).save(function (err, usr){
                    if(err) return console.log(err)
                })
                const profileObj = new Profile({username: username, headline: "Are you tho?", following:[], email: null, zipcode: null, dob: new Date(1999,09,09).getTime(), avatar: "http://theredlist.com/media/database/films/cinema/2000/avatar-/027-avatar-theredlist.jpg"})
                new Profile(profileObj).save(function (err, usr){
                    if(err) return console.log(err)
                })
            }
            return done(null, profile)
        })
	}
))


function isLoggedIn(req, res, next) {
    console.log('in isLoggedIn')
	var sid = req.cookies[cookieKey]
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        User.findOne({auth: {'facebook': req.user.username}}).exec(function(err, user) {
            if (!user) {
                req.user = req.user.username
            }
            else {
                req.user = user.username
            }
            next()
        })		
	}
	else if(!sid) {
        console.log('401')
		return res.status(401).send('isNotLoggegIn')
	} else {
		console.log('is logged in with sid: ' + sid)
        redis.hgetall(sid, function(err, userObj){
            if (err){
                console.log(err)
                res.sendStatus(500)
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

    if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		//corner case for link acount
		if(req.cookies[cookieKey] !== undefined){
			const sid = req.cookies[cookieKey]
			redis.del(sid)
			res.clearCookie(cookieKey)
		}
		return res.status(200).send('OK')
	} else {
		req.logout()
        req.user = null
		redis.del(req.cookies[cookieKey])
        req.sessionid = null
		res.clearCookie(cookieKey)
		return res.status(200).send('OK')
	}
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

// To link fb user to reg user
const linkAccount = (req, res) => {
    const username = req.body.inputUser
    const password = req.body.inputPass
    if (!username || !password) {
        return res.status(400).send()
    }
    User.findOne({username: username}).exec(function(err, eachUser) {
        if (!eachUser || eachUser.hash != md5(password + eachUser.salt)) {
            return res.status(400).send("Name password did not match")
        }
        User.update({username: username}, {$addToSet: {'auth': {'facebook': req.user}}}, function(){})
        Profile.findOne({username: username}).exec(function(err, profiles) {
            Profile.findOne({username: req.user}).exec(function(err, fbProfile) {
                let regularFollowing = profiles.following
                if (fbProfile && fbProfile.following && fbProfile.following.length > 0) {
                    fbProfile.following.map(u => {
                        if (regularFollowing.indexOf(u) < 0) {
                            regularFollowing.push(u)
                        }
                    })
                }
                Profile.update({username: username}, {$set: {'following': regularFollowing}}, function(){})
            })
        })
        Comment.update({author: req.user}, {$set: {'author': username}}, { new: true, multi: true }, function(){})
        Article.update({author: req.user}, {$set: {'author': username}}, { new: true, multi: true }, function(){})
        Article.update({'comments.author' : req.user}, { $set: {'comments.$.author': username}}, { new: true, multi: true }, function(){}) 
        return res.status(200).send("success")  
    })
}

// The unlink users
const unlinkAccount = (req, res) => {
	const username = req.user
	User.findOne({username: username}).exec(function(err, user){
        if (!user.auth){
			return res.status(400).send({status: "no user found"})
        }
		if(user.auth.length !== 0){
			User.update({username: username}, {$set: {auth: []}}, {new: true}, function(){
				return res.status(200).send({status: 'Unlilnked user'})
			})
		} else {
			return res.status(400).send({status: "Error during unlink"})
		}
	})
}

module.exports = app => {
    app.use(cookieParser())
    app.use(session({secret:'trytoguessmysecret'}))
    app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'http://samhw8v2.surge.sh', failureRedirect:'/login/facebook'}))
	// app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'http://localhost:8080', failureRedirect:'/login/facebook'}))
    app.post('/register', register)
	app.post('/login', login)
    app.use(isLoggedIn)

    app.post('/linkAccount', linkAccount)
    app.get('/unlinkAccount', unlinkAccount)
    
	app.put('/logout', logout)
    app.put('/password', putPassword)
	app.use('/profile', profile)
}
