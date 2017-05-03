
const Profile = require('./model.js').Profile

const getFollowing = (req, res) =>{
    const user = req.params.user ? req.params.user : req.user
    Profile.find({username: user}).exec(function(err, objects){
        if (err || objects.length == 0){
            console.log(err)
            res.status(400).send('Bad Request')
            return
        }
        res.send({username: objects[0].username, following: objects[0].following})
    })
}

const putFollowing = (req, res) =>{
    const userToFollow = req.params.user
    Profile.find({username : userToFollow}).exec(function(err, objects){
        if (err){
            console.log(err)
            res.status(500).send('Internal Server Error')
            return
        }
        Profile.find({username: req.user}).exec(function(error, currentuser){
            if (error){
                console.log(error)
                res.status(500).send('Internal Server Error')
                return
            }
            const u = currentuser[0]
            var followingList = u.following
            if (objects.length > 0 && !(followingList.indexOf(objects[0].username) >= 0)){
                followingList.push(objects[0].username)
            }
            Profile.update({username: u.username}, {$set:{following: followingList}}, function(e){
                if (e){
                    console.log(e)
                }
                Profile.find({username: req.user}).exec(function(x,o){
                    res.send({username: o[0].username, following: o[0].following})
                })
            })
        })
    })
}

const deleteFollowing = (req, res)=>{
    const userToRemove = req.params.user
    Profile.find({username: req.user}).exec(function(err, objects){
        if (err || objects.length == 0){
            console.log(err)
            res.status(500).send('Internal Server Error')
            return
        }
        const u = objects[0]
        const filteredList = u.following.filter((v)=>{
            return v != userToRemove
        })
        Profile.update({username: req.user}, {$set: {following : filteredList}}, function(e){
            if (e){
                console.log(e)
                res.status(500).send('Internal Server Error')
                return
            }
            Profile.find({username: req.user}).exec(function(ex, o){
                res.send({username: o[0].username, following: o[0].following})
            })
        })
    })
}

module.exports = (app) => {
    app.delete('/following/:user', deleteFollowing)
    app.put('/following/:user', putFollowing)
    app.get('/following/:user?',getFollowing)  
}