
const express = require('express')
const bodyParser = require('body-parser')
var id = 4
var article = [
    {
        id:1,
        arthor: "Scott",
        text: "First article"
    },
    {
        id:2,
        arthor: "Sam",
        text: "Second article"
    },
    {
        id:3,
        arthor: "Tiff",
        text: "Third article"
    }
] 
const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     const newArticle = {
         id : id++,
         text : req.body.text
     }  
     article = [...article, newArticle]
     res.send(newArticle)

}
const getArticle = (req, res) => {
     console.log('Payload received', article)    
     res.send(article)
}



const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
