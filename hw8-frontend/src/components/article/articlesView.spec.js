import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { shallow } from 'enzyme'
import React, {Component, PropTypes} from 'react'
 
let resource, url, searchKeyword, Reducer, ArticlesView

describe('ArticlesView (component tests)', () => {
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').resource
            url = require('../../actions').url
            Reducer = require('../../reducers').default            
            ArticlesView = require('./articleActions').ArticlesView
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    /*it('should render articles', (done)=>{
        const article = {_id:1, author:"Sam", date:"2015-09-03T23:10:42.749Z", text:"Testing article", comments:[]}
        const node = shallow(
            <div>
                <ArticlesView articles={article}/>
            </div>
        )
        console.log(shallow)
        expect(node.children().length).to.equal(1)
        done()
    })*/
})