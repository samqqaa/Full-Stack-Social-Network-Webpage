import React from 'react'
import { connect } from 'react-redux'
import { fetchFollowers } from './followingActions'

//Single follower card
const SingleUser = ({name, headline, avatar, dispatch}) => (
    <div>
        <div className='halfSpace' />
        <img className='followingUserImg' src={ avatar } height="45" width="45" />
        <div className='nameStatus' >
            <h4 id='name'> { name } <small> { headline } </small> </h4>
        </div>
        <div>
            <button type='button' className='btn btn-info btn-sm' onClick={() => {dispatch(fetchFollowers('DELETE', name))}}>Unfollow</button> 
        </div>
    </div>
)
//React component of the following card
const Following = (followers, dispatch) => {
    return(
        <div className='content following'>
            <h4> Following Users </h4>
            <div className="input-group">
                <input id='addFollowing' type='text' className="form-control" placeholder='Add new friends' />
                <button type='button' className='btn btn-info btn-sm' onClick={() => addFollowing(followers.dispatch)}> Add Followers</button>
            </div>
            <div>
                {followers.error}
            </div>
            <br/>
            <ul>
                {Object.keys(followers.followers).map((key) => followers.followers[key]).map((user) =>{
                        return (
                            <SingleUser key={user.name} name={user.name} headline={user.headline} avatar={user.avatar} dispatch={followers.dispatch}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}
// Add followers to following list
const addFollowing = (dispatch) => {
    let inputName = document.getElementById('addFollowing').value
    if (inputName) {
        dispatch(fetchFollowers('PUT', inputName))
    }
    document.getElementById('addFollowing').value=''
}

export default connect(
    (state) => {
        return {
            followers: state.followers.followers,
            error:state.followers.error
        }
    }
)(Following)