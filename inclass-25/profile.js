// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
const uploadImage = require('./uploadCloudinary')
const profile = {
    profiles:{
        'hw22':{
            headline: 'This is my headline!',
            email: 'foo@bar.com',
            dob: (new Date('08/01/1991')).toDateString(),
            zipcode: 22345,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        },
        'hw33':{
            headline: 'This is my headline!',
            email: 'foo1@bar.com',
            dob: (new Date('08/02/1991')).toDateString(),
            zipcode: 77123,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        },
        'hw44':{
            headline: 'This is my headline!',
            email: 'foo2@bar.com',
            dob: (new Date('08/03/1991')).toDateString(),
            zipcode: 88123,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
        },
    }
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
    if (!req.user) req.user = 'hw22'
    const users = req.params.users ? req.params.users.split(',') : [req.user]
	const headlines = users.map((r)=>{
		return {
			username: r,
			headline: profile.profiles[r].headline
		}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	if (!req.user) req.user = 'hw22'
	profile.profiles[req.user].headline = req.body.headline
	res.send({
			username: req.user, 
			headline: profile.profiles[req.user].headline
		})
}

const getDob = (req, res) =>{
	if (!req.user) req.user = 'hw22'
	res.send({
			username: req.user,
			dob: profile.profiles[req.user].dob	
		})
}

const getEmails = (req, res) => {
	if (!req.user) req.user = 'hw22'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			email: profile.profiles[user].email	
		})
}

const putEmail = (req, res) => {
	if (!req.user) req.user = 'hw22'
	profile.profiles[req.user].email = req.body.email
	res.send({
			username: req.user, 
			email: profile.profiles[req.user].email
		})
}

const getZipcodes = (req, res) => {
	if (!req.user) req.user = 'hw22'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			zipcode: profile.profiles[user].zipcode	
		})
}

const putZipcode = (req, res) => {
	if (!req.user) req.user = 'hw22'
	profile.profiles[req.user].zipcode = parseInt(req.body.zipcode)
	res.send({
			username: req.user, 
			zipcode: profile.profiles[req.user].zipcode
		})
}
const getAvatars = (req, res) => {
	if (!req.user) req.user = 'hw22'
	const user = req.params.user ? req.params.user : req.user
	res.send({
			username: user,
			avatar: profile.profiles[user].avatar	
		})
}

const putAvatar = (req, res) => {
	if (!req.user) req.user = 'hw22'
	profile.profiles[req.user].avatar = req.body.avatar
	res.send({
			username: req.user, 
			avatar: profile.profiles[req.user].avatar
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
	app.put('/avatar', putAvatar)  
	app.put('/avatar', uploadImage('avatar'), uploadAvatar)      
}