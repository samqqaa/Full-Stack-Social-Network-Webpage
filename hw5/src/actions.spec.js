import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 
let resource, url

describe('Validate actions ', () => {
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('./actions').resource
            url = require('./actions').url
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should mock a request', (done)=>{

        mock(`${url}/mock`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: {mock: 'mock'}
        })

        resource('GET','mock')
        .then((response)=>{
           expect(response).to.exist
        })
        .then(done)
        .catch(done)

    })

    it('should give me the http error', (done)=>{
        resource('GET','mock')
        .catch((error)=>{
           expect(error).to.be.err
        })
        .then(done)
        .catch(done)
    })    

    it('should be POSTable', (done)=>{

        const username = 'hw22'
        const password = 'breakfast-jump-cause'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, result:'success'}
        })

        resource('POST', 'login', {username, password})
        .then((response)=>{
            expect(response.username).to.equal(username)
            expect(response.result).to.equal('success')
        })
        .then(done)
        .catch(done)
    })
})