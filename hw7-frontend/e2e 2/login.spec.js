import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findClass, findAllCSS } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(expect(findId('myStatus')).to.exist)
        .then(done)
    })
    
    it('Should post a new article', (done) => {
        const testArticle = "Testing Article"
        sleep(500)
        .then(findId('newPost').clear())
        .then(findId('newPost').sendKeys(testArticle))
        .then(sleep(500))
        .then(findId('postButton').click())
        .then(sleep(1000))
        .then(findId('ContentEditable').getText()
        	.then((text)=>{expect(text).to.eql(testArticle)}))
        .then(sleep(500))
        .then(done)
    })

    it('Shoule edit an article', (done) => {
    	const editArticle = "Editing Article"
		sleep(500)
		.then(findId('ContentEditable').getText()
			.then (text => { 
				sleep(500)
				findId('ContentEditable').clear()
				findId('ContentEditable').sendKeys(editArticle)
				findId('editBtn').click()
				sleep(500)
			}))
		.then(findId('ContentEditable').getText()
			.then(text => { expect(text).to.equal(editArticle) }))			
		.then(done)
    })
    it('Update the headline and verify the change', (done) => {
        const oldHeadline = "Becoming a web developer"
        const newHeadline = "Am a web developer"
        findId('inputHeadline').sendKeys(oldHeadline)
        .then(findId('editHeadlineBtn').click())
        .then(sleep(500))
        .then(findId('myStatus').getText()
        	.then( text => { expect(text).to.equal(oldHeadline) }))
        .then(findId('inputHeadline').clear())
        .then(findId('inputHeadline').sendKeys(newHeadline))
        .then(findId('editHeadlineBtn').click())
        .then(sleep(500))
        .then(findId('myStatus').getText()
            .then( text => { expect(text).to.equal(newHeadline) }))
        .then(done)
    })

    it('should add a follower', (done) => {
		var followerCount
		sleep(1000)
        .then(findClass('followingUser')        
        .then(sleep(1000))
        .then(followers=>{
            expect(followers.length).to.be.at.least(1)
            followerCount = followers.length;
        }))        
		.then(findId('addFollowing').sendKeys('Follower'))
        .then(sleep(500))
        .then(findId('followingBtn').click())
        .then(sleep(500))
		.then(findClass('followingUser').then(followers=>{
            expect(followers.length).to.equal(followerCount+1)
        })
		.then(done))		
    })
    it('should remove a follower', (done) => {
		var followerCount
		sleep(1000)
        .then(findClass('followingUser')        
        .then(sleep(1000))
        .then(followers=>{
            expect(followers.length).to.be.at.least(1)
            followerCount = followers.length;
        }))        
        .then(sleep(500))
        .then(findId('unfollowBtn').click())
        .then(sleep(1000))
		.then(findClass('followingUser').then(followers=>{
            expect(followers.length).to.equal(followerCount-1)
        })
		.then(done))		
    })
    it('should search for articles', (done) => {
    	const searchkey = "Only One Article Like This"
    	sleep(1000)
    	.then(findId('searchInput').clear())
    	.then(findId('searchInput').sendKeys(searchkey))
    	.then(sleep(500))
    	.then(findClass('ContentEditable')
    	.then(sleep(500))
        .then(article=>{
            expect(article.length).to.be.eql(1)
        }))
        .then(findId('articleAuthor').getText().then(author=>{
            expect(author).to.be.eql('hw22test')
        }))
    	.then(done)
    })
    it('should navigate to profile and update email', (done) => {
    	const oldEmail = "hw22@rice.edu"
    	const newEmail = "hw33@rice.edu"
    	sleep(1000)
    	.then(findId('profileBtn').click())
    	.then(sleep(1000))
    	.then(expect(findId('avatar')).to.exist)
        .then(findId('inputEmail').clear())
        .then(findId('inputEmail').sendKeys(oldEmail))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('inputEmail').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldEmail)}))
        .then(findId('inputEmail').clear())
        .then(findId('inputEmail').sendKeys(newEmail))
        .then(findId('updateBtn').click())
        .then(sleep(1000))
        .then(findId('inputEmail').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newEmail)}))
        .then(done)
    })

    it('should navigate to profile and update zipcode', (done) => {
    	const oldZipcode = "11111"
    	const newZipcode = "22222"
    	sleep(1000)
    	.then(findId('profileBtn').click())
    	.then(sleep(1000))
    	.then(expect(findId('avatar')).to.exist)
        .then(findId('inputZipcode').clear())
        .then(findId('inputZipcode').sendKeys(oldZipcode))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('inputZipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(oldZipcode)}))
        .then(findId('inputZipcode').clear())
        .then(findId('inputZipcode').sendKeys(newZipcode))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('inputZipcode').getAttribute('placeholder')
        .then(text=>{ expect(text).to.eql(newZipcode)}))
        .then(done)
    })

    it('should navigate to profile and update password', (done) => {
    	const newPassword = "22222"
    	sleep(1000)
    	.then(findId('profileBtn').click())
    	.then(sleep(1000))
        .then(findId('inputPassword1').clear())
        .then(findId('inputPassword1').sendKeys(newPassword))
        .then(findId('inputPassword2').sendKeys(newPassword))
        .then(findId('updateBtn').click())
        .then(sleep(2000))
        .then(findId('profileError')
        .then((text)=>{expect(text).to.exist}))
        .then(done)
    })
    after('should log out', (done) => {
        common.logout().then(done)
    })
})
