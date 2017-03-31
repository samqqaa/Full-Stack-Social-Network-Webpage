var cookieParser = require('cookie-parser')
const md5 = require('md5')

let userlist = []
const cookieKey = 'sid'

function register(req, res) {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
    //randon salt number
    const salt = Math.random()
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

function login(req, res) {
	const username = req.body.username
	const password = req.body.password
	if(!username || !password) {
		res.sendStatus(400)
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
}


module.exports = app => {
    app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
}
