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
                dispatch(getData())
            }).catch(e => {
                // TBI
                // dispatch(updateError(`There was an error logging in as ${username}`))
            })
    }
}
const userLogout = () => {
    return (dispatch) => {
        dispatch({type: 'Logout'})
    }
}

const getData = () => {
    return (dispatch) => {
        resource('Get', 'headlines')
            .then(r => {
                // dispatch(updateHeadline)
                dispatch(fetchFollowers())
                dispatch(fetchProfile())
                dispatch(fetchArticles())
            }).catch(e => {

            })
    }
}

export{ userLogin, getData, userLogout }
