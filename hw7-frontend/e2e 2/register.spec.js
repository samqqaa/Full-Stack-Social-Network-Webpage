import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test registering new user', () => {

    before('should not log in', (done) => {
        go().then(done)
    })

    it('should successfully register', (done) => {
        sleep(500)
        .then(findId('registerName').sendKeys('newUser'))
        .then(findId('inputEmail').sendKeys('new@gmail.com'))
        .then(findId('inputDOB').sendKeys('12-21-91'))
        .then(findId('inputNumber').sendKeys('123-456-1234'))
        .then(findId('inputZipcode').sendKeys('77123'))
        .then(findId('inputPassword1').sendKeys('123'))
        .then(findId('inputPassword2').sendKeys('123'))
        .then(findId('submitBtn').click())
        .then(sleep(1000))
        .then(findId('registerHint').then((e)=>{
            expect(e).to.exist
        }))
        .then(sleep(500))
        .then(done)
    })
})