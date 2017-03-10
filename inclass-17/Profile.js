
const index = (req, res) => {
     res.send({ hello: 'world' })
}
const getHeadlines = (req, res) =>{
    res.send({ headlines:[{
            username: 'me',
            headline: "Happy"
        }]
    })
}
const putHeadlines = (req, res) =>{
    res.send({ 
            username: 'Sam',
            headline: req.body.headline || 'N/A'
    })
}
const getEmail = (req, res) => {
    res.send({ 
            username: 'me',
            email: "scott@rice.edu"
    })
}
const putEmail = (req, res) =>{
    res.send({ 
            username: "Sam",
            email: req.body.email || "N/A"
    })
}
const getZipcode = (req, res) =>{
    res.send({ 
            username: 'me',
            zipcode: "77019"
    })
}
const putZipcode = (req, res) =>{
    res.send({
            username: "Sam",
            zipcode: req.body.zipcode || "N/A"
    })
}
const getAvatars = (req, res) =>{
    res.send({ avatars: [{
            username: 'me',
            avatar: "default url"
        }]
    })
}
const putAvatars = (req, res) =>{
    res.send({
            username: "Sam",
            avatar: req.body.avatar ||  "N/A"
    })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadlines)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatars)

}