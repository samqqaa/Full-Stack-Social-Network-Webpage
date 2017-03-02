import React from 'react'

var id = 4
//Single follower card
const SingleUser = ({user, id, self}) => (
    <div>
        <div className='halfSpace' />
        <img className='followingUserImg' src={user.image} height="45" width="45" />
        <div className='nameStatus' >
            <h4 id='name'> {user.name} <small> {user.status} </small> </h4>
        </div>
        <div>
            <button type='button' className='btn btn-info btn-sm' onClick={() => remove(id, self)}>Unfollow</button> 
        </div>
    </div>
)
//React component of the following card
class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {userList: props.followings}
    }
    render() {
        return(
            <div className='content following'>
                <h4> Following Users </h4>
                <div className="input-group">
                    <input id='addFollowing' type='text' className="form-control" placeholder='Add new friends' />
                    <button type='button' className='btn btn-info btn-sm' onClick={() => addFollowing(this)}> Add Followers</button>
                </div>
                <br/>
                <ul>
                    {this.state.userList.map((user) => {
                            return (
                                <SingleUser key={user.id} id={user.id} user={user} self={this}/>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
//Add new followers into following list
const addFollowing = (self) => {
    var name = document.getElementById('addFollowing').value 
    if(name !== '') {
        self.setState({
            userList: [
                ...self.state.userList,
                {
                    id: id,
                    image:"http://images1.villagevoice.com/imager/u/blog/7511881/voice-emojis-24_trump-joerocco.png",
                    name: name,
                    status:"Can't agree with John more!"
                }
            ]
        })
        id++
        document.getElementById('addFollowing').value = ''
    }
}
//Remove the following user from the following list
const remove = (id, self) => {
    self.setState({
        userList: self.state.userList.filter((user) => user.id != id)
    })
}

export default Following