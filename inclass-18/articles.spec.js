/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url('/articles'))
		.then(r => {
			expect(r.status).to.equal(200)
			return r.json()
		}) 
		.then(body => {
			expect(body.length).to.be.greaterThan(2)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		const newArticle1 = {author: 'hw22', text: 'first new article'}
        const newArticle2 = {author: 'SW', text: 'second new article'}
		fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newArticle1)
        })
		.then(r => {
			expect(r.status).to.equal(200)
			return r.json()
		})
		.then(body => {
			expect(body.text).to.equal(newArticle1.text)
			expect(body.author).to.equal(newArticle1.author)
			expect(body).to.haveOwnProperty('id')
			const firstID = body.id
			return body.id
		})
		.then(id => {
			fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newArticle2)})
			.then(r => {
				expect(r.status).to.equal(200)
				return r.json()
			})
			.then(body => {
				expect(body.text).to.equal(newArticle2.text)
				expect(body.author).to.equal(newArticle2.author)
				expect(body).to.haveOwnProperty('id')
				expect(body.id).to.equal(id+1)
			})
		})
		.then(done)
		.catch(done)
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
 	}, 200)

	it('should return an article with a specified id', (done) => {
		fetch(url('/articles'))
		.then(r => {
			expect(r.status).to.equal(200)
			return r.json()
		}) 
		.then(body => {
			const curID = body.length
			const randID = Math.floor(Math.random()*curID) + 1
			return randID
		})
		.then(randomID => {
			fetch(url('/articles/' + randomID))
			.then(r => {
				expect(r.status).to.equal(200)
				return r.json()
			})
			.then(body => {
				expect(body.length).to.equal(1)
			})
		})
		.then(done)
		.catch(done)
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url('/articles/' + 0))
		.then(r => {
			expect(r.status).to.equal(200)
			return r.json()
		}) 
		.then(body => {
			expect(body.length).to.equal(0)
		})
		.then(done)
		.catch(done)
	}, 200)

});
