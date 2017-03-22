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
         text : req.body.text,
         author: req.body.author
     }  
     article = [...article, newArticle]
     res.send(newArticle)

}
const getArticle = (req, res) => {
     if (req.params.id){
	    res.send(article.filter((article) => article.id == req.params.id))
     }
     else{
        res.send(article)
     }
}



module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.post('/article', addArticle)
}

// const app = express()
// app.use(bodyParser.json())
// app.post('/article', addArticle)
// app.get('/', hello)
// app.get('/articles', getArticle)
