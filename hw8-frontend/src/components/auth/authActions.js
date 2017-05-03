import { resource } from '../../actions'
import { connect } from 'react-redux'
import { fetchProfile } from '../profile/profileActions'
import { fetchArticles } from '../article/articleActions'
import { fetchFollowers } from '../main/followingActions'

// The log in function
const userLogin = (username, password) => {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
            .then(r => {
                dispatch({type: 'Login', username: r.username})
                dispatch(getData())
                dispatch({type: 'goToMainPage'})
            }).catch(e => {
                dispatch({type: 'loginError', error: 'Error when login'})
            }
        )
    }
}
// The log out function
const userLogout = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(r => {
                dispatch({type: 'Logout'})
                dispatch({type: 'clearProfile'})
                dispatch({type: 'clearFollowers'})
                dispatch({type: 'clearArticles'})
            }).catch(e => {
            })
    }
}
// Get all the data from the server
const getData = () => {
    return (dispatch) => {
        resource('Get', 'headlines')
            .then(r => {
                dispatch({type: 'goToMainPage'})
                dispatch(fetchFollowers())
                dispatch(fetchProfile())
                dispatch(fetchArticles())
            }).catch(e => {
            })
    }
}
const register = (username, email, phone, dob, zipcode, password, cpassword) =>  {
    return (dispatch) => {
        if (!username || !email || !phone || !dob || !zipcode || !password || !cpassword) {
            return dispatch({type: 'registerError', error: 'All fields must be supplied'}) 
        }
        resource('POST', 'register', {username:username, email:email, dob:dob, zipcode:zipcode, password:password})
        .then((response) => {
            return dispatch({type:"registered", error: "Successfully registered!"})
        }).catch((err) => {
            return dispatch({type: 'registerError', error: 'Error when registering'})
        })
    }
}

const facebookLogin = () => {
    return (dispatch) => {
        // window.top.location = 'http://localhost:3000/login/facebook';
        window.top.location = 'https://samhw777.herokuapp.com/login/facebook'
    }
}
export{ userLogin, getData, userLogout, register, facebookLogin}
