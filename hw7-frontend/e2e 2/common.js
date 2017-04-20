import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'hw22test',
    password: 'edge-someone-please'
}

exports.login = () =>
    sleep(500)
        .then(findId('inputName').clear())
        .then(findId('inputPassword').clear())
        .then(findId('inputName').sendKeys(exports.creds.username))
        .then(findId('inputPassword').sendKeys(exports.creds.password))
        .then(findId('signin').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logoutNav').click())
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'
