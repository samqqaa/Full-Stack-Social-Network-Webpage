import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import React, {Component, PropTypes} from 'react'
 
let resource, url, searchKeyword, Reducer, ArticlesView

    const initialState={
        articles:{articles:{},avatars:{},searchKeyword:""},
        followers:{error:"", followers:{}},
        navi:{error:""},
        profile:{avatar:"", email:"", headline:"", phoneNumber:"123-321-1234", username:"", zipcode:""}
    }
Reducer = require('./reducers').default

describe('Validate reducer (no fetch requests here)', (done) => {
    it('should initialize state', ()=>{
        expect(Reducer(undefined, {})).to.eql(initialState)
    })

    let error= 'Error when login'
    it('should state error (for displaying error message to user)', ()=>{
        expect((Reducer({}, {type:'loginError',error})).navi.error).to.eql(error)
        // expect(Reducer({}, {type:'loginError',error})).to.eql({...initialState, articles:{...initialState.articles, searchKeyword:keyword}})
    })    

    it('should state success (for displaying success message to user)', ()=>{
        expect((Reducer({}, {type:'Login',error})).navi.error).to.eql('')
        // expect(Reducer({}, {type:'loginError',error})).to.eql({...initialState, articles:{...initialState.articles, searchKeyword:keyword}})
    }) 

    const newArticle = {
        _id: 1, author:'Sam', text:'first Article'
    }
    let oldArticles = {}
    oldArticles[newArticle._id]= newArticle 
    it('should update the articles', ()=>{
        expect(Reducer(undefined, {type:'postNewArticle', newArticle})).to.
        eql({...initialState,articles: {articles:oldArticles, avatars:{}, searchKeyword:""}})
    })

    const keyword = 'Search_Keyword'
    it('should set the search keyword', ()=>{
        expect(Reducer({}, {type:'searchKeyword',keyword})).to.eql({...initialState, articles:{...initialState.articles, searchKeyword:keyword}})
    })
})