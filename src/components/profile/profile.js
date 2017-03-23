import React from 'react'
import Nav from '../main/nav'
import {connect} from 'react-redux'
import ProfileForm from './profileForm'

//Profile layout of the Ricebook user
export const Profile = ({user}) => {
    return(
        <div>
            <Nav user={user} />
            <ProfileForm user={user}/>
        </div>
    )
}

//Get user from the state
export default connect(
    (state) => {
        return {
            user: state.user
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Profile)