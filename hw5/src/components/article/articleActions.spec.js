import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 
let resource, url, searchKeyword, Reducer, fetchArticles, postArticle

describe('Validate Article actions', () => {
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').resource
            url = require('../../actions').url
            Reducer = require('../../reducers').default            
            fetchArticles = require('./articleActions').fetchArticles
            postArticle = require('./articleActions').postArticle
            searchKeyword = require('./articleActions').searchKeyword
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should fetch articles (mocked request)', (done)=>{
        const getState = {articles : {avatars:{}}}
        mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { articles: [{_id: 1, author: 'Mocker', comments: 'MOCKING' }]}
        })
        let state 
        fetchArticles()(
            (r) => {
                expect(r.articles[1].author).to.equal('Mocker') 
                done()
            },
            ()=>{return getState}
        )
    })
//it has warning because the fetch articles action is chained
    it('should update the search keyword', (done)=>{
        const keyword = 'newKeyword'
        let state
        searchKeyword(keyword)(action => {
            expect(action.type).to.be.eql('searchKeyword')
            state = Reducer({}, action)
            expect(state.articles.searchKeyword).to.eql(keyword)
            done()
        })
    })
    
    it('should render articles', (done)=>{
        mock(`${url}/article`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: { articles: [{_id: 1, author: 'Mocker', comments: 'MOCKING' }]}
        })
        const newArticle = 'newArticle'
        let state 
        postArticle(newArticle,'')(action => {
            expect(action.type).to.be.eql('postNewArticle')
                // expect(action.type).to.be.eql('searchKeyword')
                // expect(r.articles[1].author).to.equal('Mocker') 
            done()
            }
        )
    })
})