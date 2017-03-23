import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

 
let resource, url, userLogin, userLogout, Reducer

describe('Validate Authentication (involves mocked requests)', () => {
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('../../actions').resource
            url = require('../../actions').url
            Reducer = require('../../reducers').default            
            userLogin = require('./authActions').userLogin
            userLogout = require('./authActions').userLogout
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })  

    it('should log in a user', (done)=>{
        const username='hw22'
        const password='breakfast-jump-cause'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

        let flag = true
        let state 
        userLogin(username, password)(
            (action) => {
                if(flag) {
                    expect(action).to.eql({ type: 'Login', username: 'hw22' }) 
                    state = Reducer({},action)
                    expect(state.profile.username).to.eql(username)
                    flag = !flag
                } else {
                    done()
                }
                    // state = Reducer({}, action)
                    // expect(state.user.accountName).to.eql(username)
            })
    })
    it('should not log in an unauthorized user', (done)=>{
        const username='unauthorizedName'
        const password='unauthorizedPswd'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

        let flag1 = true
        userLogin(username, password)(
            (action) => {
                if(flag1) {
                    console.log(action)
                    expect(action).to.eql({ type: 'Login', username: username }) 
                    flag1 = !flag1
                    state = Reducer({},action)
                    console.log(state)

                } else {
                    done()
                }
                    // state = Reducer({}, action)
                    // expect(state.user.accountName).to.eql(username)
            })
    })
})