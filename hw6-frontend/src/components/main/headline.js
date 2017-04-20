import React from 'react'
import { connect } from 'react-redux'
import { updateData } from '../profile/profileActions'
//Headline of user Image and status
const Headline = (profile) => {
    return(
        <div className='content headline'>
            <div>
                <label className='displayName'><h2 color="red"> {profile.profile.username}</h2></label>
                <br/>
                <img src={profile.profile.avatar} className="img-circle" height="100" width="100" alt="Avatar"/>
                <div id='myStatus'> {profile.profile.headline} </div>
            </div>
            <br/>
            <div className="form-group">
                <input type="text" className="form-control" id="inputHeadline" placeholder="Update your status.."/>
                <button id="editHeadlineBtn"type="button" className="btn btn-default" onClick={() => updateHeadline(profile.dispatch,profile)}>Update</button>
            </div>
        </div>
    )
}
//Function to update the headline 
const updateHeadline = (dispatch, profile) => {
    const newHeadline = document.getElementById('inputHeadline').value
    if(newHeadline) {
        dispatch(updateData('headline', newHeadline))
        document.getElementById('inputHeadline').value = ''
    }
}

export default connect(
    (state) => {
        return {
            profile: state.profile
        }
    }
)(Headline)