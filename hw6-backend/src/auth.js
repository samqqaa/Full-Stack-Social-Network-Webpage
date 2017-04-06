var cookieParser = require('cookie-parser')
const md5 = require('md5')
const salt = Math.random()
const password = 123
let userlist = [
	{username: 'Sam', salt: salt, hash: md5(salt + '' + password)}
]
const cookieKey = 'sid'

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

function login(req, res) {
	console.log('hreq')
	console.log(req)
	console.log(res)
	const username = req.body.username
	const password = req.body.password
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
    app.use(cookieParser())
	app.post('/register', register)
	app.post('/login', login)
	app.put('/logout', logout)
    app.put('/password', putPassword)
}
