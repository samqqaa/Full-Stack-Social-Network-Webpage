
// let articles = [
// 	{
// 		_id: 1,
// 		author: "Scott",
// 		text: "This is my first article",
// 		date: new Date(),
// 		comments: []
// 	},
// 	{
// 		_id: 2,
// 		author: "Tiff",
// 		text: "This is my Second article",
// 		date: new Date(),
// 		comments: []
// 	},
// 	{
// 		_id: 3,
// 		author: "Sam",
// 		text: "This is my Third article",
// 		date: new Date(),
// 		comments: []
// 	}
// ]


const Article = require('./model.js').Article
const Profile = require('./model.js').Profile
const Comment = require('./model.js').Comment
const ObjectId = require('mongodb').ObjectId
const md5 = require('md5')

const getArticles = (req, res) => {
	if(req.params.id){
		Article.find({_id:req.params.id}).exec(function(err, article){
			if(article === null || article.length === 0) {
				res.status(401).send('Cannnot get article')
				return
			}
			const articleObj = article[0]
			res.status(200).send({articles: articleObj})
		})
	} else {
		Article.find({}).exec(function(err, articles){
			res.status(200).send({articles: articles})
		})
	}
}

const postArticle = (req, res) => {

	if(!req.body.text) {
		res.status(400).send('Add articles error')
		return
	}

	const newArticle = new Article({
		author: req.user,
     	img: null,
		text: req.body.text,
		date: new Date(),
		comments: []
	})

	new Article(newArticle).save(function(err, article){
		if(err) throw err
		else {
			res.status(200).send({articles: [article]})
		}
	})
	// res.send(newArticle)
	// articles.push(newArticle)
}

const putArticle = (req, res) => {
	if(!req.params.id) {
		res.status(400).send('Put articles error: no id')
		return		
	}
	Article.find({_id:req.params.id}).exec(function(err, article){
		if(article === null || article.length === 0) {
			res.status(401).send('Put articles error: no specified article')
			return
		}
		if(req.body.commentId == "-1") {
			const commentId = md5(req.user + new Date().getTime())
			const commentObj = new Comment({commentId: commentId, author: req.user, date: new Date(), text: req.body.text})
			new Comment(commentObj).save(function(err, comment){
				if(err) {
					throw err
				}
			})
			Article.findByIdAndUpdate(req.params.id, {$addToSet: {comments:commentObj}}, {upsert:true, new:true}, function(err, article){})
			Article.find({_id:req.params.id}).exec(function(err, article){
				res.status(200).send({articles: article})
			})
		} else if(req.body.commentId) {
			Comment.find({commentId: req.body.commentId}).exec(function(err, comments){
				if(comments === null || comments.length === 0) {
					res.status(401).send('Put articles error: no specified comment')
					return
				}
				if(comments[0].author === req.user) {
					Comment.update({commentId: req.body.commentId}, { $set: {text:req.body.text}}, {new:true}, function(err, comments){})
					Article.update({_id:req.params.id, 'comments.commentId':req.body.commentId}, {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, articles){})
                    Article.find({_id:req.params.id}).exec(function(err, article){
                        res.status(200).send({articles: article})
                    })					
				}
			})
		} else {
			if(article[0].author === req.user) {
				Article.findByIdAndUpdate(req.params.id, {$set: {text:req.body.text}}, {upsert:true, new: true}, function(err, article){
					res.status(200).send({articles: [article]})
				})
			}
		}
	})
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', postArticle)
	app.put('/articles/:id', putArticle)
}