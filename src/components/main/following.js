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

const addFollowing = (dispatch) => {
    let inputName = document.getElementById('addFollowing').value
    if (inputName) {
        dispatch(fetchFollowers('PUT', inputName))
    }
    document.getElementById('addFollowing').value=''
}

// //TBRRrRRRR
// const addFollowing = (self) => {
//     var name = document.getElementById('addFollowing').value 
//     if(name !== '') {
//         self.setState({
//             userList: [
//                 ...self.state.userList,
//                 {
//                     id: id,
//                     image:"http://images1.villagevoice.com/imager/u/blog/7511881/voice-emojis-24_trump-joerocco.png",
//                     name: name,
//                     status:"Can't agree with Vivian more!"
//                 }
//             ]
//         })
//         id++
//         document.getElementById('addFollowing').value = ''
//     }
// }
// //TBRRrRRRR
// const remove = (id, self) => {
//     self.setState({
//         userList: self.state.userList.filter((user) => user.id != id)
//     })
// }


export default connect(
    (state) => {
        return {
            followers: state.followers.followers
        }
    }
)(Following)