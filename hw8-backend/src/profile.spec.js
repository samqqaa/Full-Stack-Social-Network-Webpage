const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('PUT/GET headline', () => {
    it('should put a new headline', (done)=>{
        var username, oldHeadline, newHeadline
        fetch(url("/headlines"), {
            "method": 'GET',
            "headers": {'Content-Type': 'application/json'}
        })
        .then(res=>{
            expect(res.status).to.equal(200)
            return res.json()
        })
        .then((res)=>{
            username = res.headlines[0].username
            oldHeadline = res.headlines[0].headline
            newHeadline = 'new' + oldHeadline
        })  
        .then(_=>{
            return fetch(url("/headline"), {
                "method": 'PUT',
                "headers": {'Content-Type': 'application/json'},
                "body": JSON.stringify({"headline": newHeadline})
            })            
        })
        .then(res=>{
            expect(res.status).to.equal(200)
            return res.json()
        })
        .then((res)=>{
            expect(res.headline).to.equal(newHeadline)
        })
        .then(_=>{
            return fetch(url("/headlines/" + username), {
                "method": 'GET',
                "headers": {'Content-Type': 'application/json'}
            })
        })
        .then(res => {
            expect(res.status).to.equal(200)
            return res.json()
        })
        .then(res => {
            expect(res.headlines).to.exist
            expect(res.headlines[0].headline).to.not.equal(oldHeadline)
            expect(res.headlines[0].headline).to.equal(newHeadline)
        })
        .then(done)
        .catch(done)
    }, 200)
});