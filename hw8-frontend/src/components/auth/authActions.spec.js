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
        let state 
        let flag = true
        userLogin(username, password)(
            (action) => {
                if (flag){
                    flag = false
                    expect(action).to.eql({ type: 'Login', username: 'hw22' }) 
                    state = Reducer({},action)
                    expect(state.profile.username).to.eql(username)
                    done()
                }
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
        let state
        userLogin(username, password)(
            (action) => {
                expect(action).to.eql({ type: 'loginError', error: 'Error when login' }) 
                state = Reducer({},action)
                expect(state.profile.username).to.eql('')
                expect(state.navi.error).to.eql('Error when login')
                done()
            })
    })

    it('should log out a user', (done)=>{

        const username='hw22'
        const password='breakfast-jump-cause'
        
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result:'success'}
        })

        let state, flag, flag1
        userLogin(username, password)(
            (action) => {
                state = Reducer({},action)
            })
        userLogout()(
            (action) => {
                state = Reducer({}, action)
            }
        )
        expect(state.profile.username).to.be.eql('')
        done()
    })    
})