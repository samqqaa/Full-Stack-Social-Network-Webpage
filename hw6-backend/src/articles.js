let id = 4

let articles = [
	{
		_id: 1,
		author: "Scott",
		text: "This is my first article",
		date: new Date(),
		comments: []
	},
	{
		_id: 2,
		author: "Tiff",
		text: "This is my Second article",
		date: new Date(),
		comments: []
	},
	{
		_id: 3,
		author: "Sam",
		text: "This is my Third article",
		date: new Date(),
		comments: []
	}
]


const getArticles = (req, res) => {
	if(req.params.id) {
		res.send(articles.filter((article) => article._id == req.params.id))
	} else {
		res.send(articles)
	}
}

const postArticle = (req, res) => {
	const newArticle = {
     	_id: id++,
		author: 'Sam',
     	text: req.body.text,
		date: new Date(),
		comments: [ ]
	}
	res.send(newArticle)
	articles.push(newArticle)
}

const putArticle = (req, res) => {
	const text = req.body.text;
	if(req.params.id > articles.length || req.params.id <= 0){
		res.status(401).send("Forbidden!")
		return;
	}
	if(!req.body.commentId){
		articles[req.params.id-1].text = req.body.text;
	}
	else{
		articles[req.params.id-1].comments.push(req.body.text);
	}
	res.status(200).send({articles: [articleSet[req.params.id-1]]});	
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', postArticle)
	app.put('/articles/:id', putArticle)
}