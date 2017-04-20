/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url('/articles'))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			expect(body.length >= 3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		fetch(url('/article'), {
			method:'POST',
            headers:new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({text:"test1"})
		})
		// verify you get the article back with an id
		.then((res) => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then((body) => {
			expect(body).to.have.property('_id')
			return body
		})
		// verify the content of the article
		.then((body) => {
			expect(body.text).to.eql("test1")
			return body._id
		})
		// add a second article
		.then((id) => {
			fetch(url('/article'), {
				method:'POST',
	            headers:new Headers({ 'Content-Type': 'application/json' }),
	            body: JSON.stringify({text:"test2"})
			})
		// verify the article id increases by one
			.then((res) => {
				expect(res.status).to.eql(200)
				return res.json()
			})
			.then((body) => {
				expect(body).to.have.property('_id')
				return body
			})
			.then((body) => {
				expect(body._id).to.eql(id + 1)
				return body
			})
		// verify the second artice has the correct content
			.then((body) => {
				expect(body.text).to.eql("test2")
			})
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		var articleID
		fetch(url('/articles'))
		.then((res) => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then((body) => {
			var articleID = Math.floor(1 + Math.random() * 3)
			return articleID
		})
		// then call GET /articles/id with the chosen id
		.then((articleID) => {
			fetch(url('/articles/' + articleID))
			.then((res) => {
				expect(res.status).to.eql(200)
				return res.json()
			})
		// validate that only one article is returned
			.then((body) => {
				expect(body.length).to.eql(1)
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		fetch(url('/articles/' + 0))
		.then((res) => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		// confirm that you get no results
		.then((body) => {
			expect(body.length).to.eql(0)
		})
		.then(done)
		.catch(done)
		
	}, 200)

});
