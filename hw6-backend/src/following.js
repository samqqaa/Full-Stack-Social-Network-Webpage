
const following = {
    users:{
    	'hw22':['hw22test','sep1','hx12'],
        'sampleUser':['sep1','sep2','sep3'],
    }
}

const getFollowing = (req, res) =>{
    if (!req.user) req.user = 'hw22'
    const user = req.params.user ? req.params.user : req.user
    res.send({
        username: user,
        following: following.users[user]
    })
}

const putFollowing = (req, res) =>{
    if (!req.user) req.user = 'hw22'
    if (!following.users[req.user].includes(req.params.user)){
        following.users[req.user].push(req.params.user)
    }
    res.send({
        username: req.user,
        following: following.users[req.user]
    })
}

const deleteFollowing = (req, res)=>{
    if (!req.user) req.user = 'hw22'
    following.users[req.user] = following.users[req.user].filter((e)=>{
		return e != req.params.user
	})
    res.send({
        username: req.user,
        following: following.users[req.user]
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}