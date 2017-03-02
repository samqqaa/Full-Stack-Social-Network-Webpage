import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })
    it("Update the headline and verify the change", (done) => {
        const oldHeadLine = "Old"
        const newHeadline = 'New'
        var username = common.creds.username;
        sleep(500)
        findId('newHeadline').sendKeys(newHeadline)
        .then(findId('headline').click())
        .then(sleep(1000))
        .then(findId('message').getText().then(
            text => {
                expect(text).to.equal(preamble+' ' + username +' "'+newHeadline + '"')
            })
        )
        .then(sleep(1000))
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(oldHeadLine))
        .then(findId('headline').click())
        .then(sleep(1000))

        .then(findId('message').getText()
            .then(
            text => {
                expect(text).to.equal(preamble+' ' + username +' "'+oldHeadLine + '"')
            })
        )
        .then(done)



        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
