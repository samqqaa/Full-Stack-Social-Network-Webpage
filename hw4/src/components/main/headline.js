import React from 'react'

//Headline of user Image and status
const Headline = ({user, profile}) => {
    return(
        <div className='content headline'>
            <div>
                <label className='displayName'><h2 color="red"> {profile.displayName}</h2></label>
                <br/>
                <img src={user.img} className="img-circle" height="100" width="100" alt="Avatar"/>
                <div id='myStatus'> My Status </div>
                </div>
                <br/>
                <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName" placeholder="Update your status.."/>
                <button type="button" className="btn btn-default" onClick={() => updateStatus()}>Update</button>
            </div>
        </div>
    )
}
//Function to update the headline 
const updateStatus = () => {
    if(document.getElementById('exampleInputName').value != '') {
        document.getElementById('myStatus').innerHTML = 
            document.getElementById('exampleInputName').value
        document.getElementById('exampleInputName').value = ''
    }
}

export default Headline