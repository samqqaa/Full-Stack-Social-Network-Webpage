import { resource } from '../../actions'
import { connect } from 'react-redux'
import { fetchProfile } from '../profile/profileActions'
import { fetchArticles } from '../article/articleActions'
import { fetchFollowers } from '../main/followingActions'

const userLogin = (username, password) => {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
            .then(r => {
                dispatch({type: 'Login', username: r.username})
                dispatch({type: 'goToMainPage'})
                dispatch(getData())
            }).catch(e => {
                dispatch({type: 'loginError', error: 'Error when login'})
            })
    }
}
const userLogout = () => {
    return (dispatch) => {
        dispatch({type: 'Logout'})
        dispatch({type: 'clearProfile'})
        dispatch({type: 'clearFollowers'})
        dispatch({type: 'clearArticles'})
    }
}

const getData = () => {
    return (dispatch) => {
        resource('Get', 'headlines')
            .then(r => {
                dispatch(fetchFollowers())
                dispatch(fetchProfile())
                dispatch(fetchArticles())
            }).catch(e => {
            })
    }
}

export{ userLogin, getData, userLogout }
