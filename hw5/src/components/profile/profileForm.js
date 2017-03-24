import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { updateData } from './profileActions'
//Profile card of the Ricebook User
const ProfileCard = ({profile, index, user, self, update, dispatch}) => {
    console.log(profile)
return (
      <div className="row">
        <div className="well">
          <div className="row">
            <div  className="col-sm-3">
                <img src={profile.profile.avatar} className="img-circle" height="200" width="200" alt=""/>
                    <button type="button" className="btn btn-default btn-sm">
                        <input  type="file" />
                    </button>
            </div>
            <br/>  
        <div  className="col-sm-7">
            <form className="form-horizontal"  onSubmit={(event)=> {
                    event.preventDefault()
                    validate(profile)}}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Display Name</label>
                    <div className="col-sm-4">
                       <input type="text" className="form-control" id="inputName" placeholder={ profile.profile.username }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-4">
                        <input type="email" className="form-control" id="inputEmail" placeholder={ profile.profile.email }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="inputDOB" placeholder={ profile.profile.dob } disabled/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-4">
                        <input type="phoneNumber"className="form-control" id="inputNumber" pattern ="\d{3}[\-]\d{3}[\-]\d{4}" placeholder={ profile.profile.phoneNumber }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Zipcode</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="inputZipcode" pattern ="\d{5}" placeholder={ profile.profile.zipcode }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-4">
                      <input type="password" className="form-control" id="inputPassword1" placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Comfirm Password</label>
                    <div className="col-sm-4">
                      <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Change Profile</button>
                    </div>
                </div>
            </form>
          </div>
          </div>

        </div>
      </div>
)
}
//Function to validate each profile update and 
//update the value to the state
const validate = (profile)=>{
    var inputName = document.getElementById("inputName").value
    var inputEmail = document.getElementById("inputEmail").value
    var inputNumber = document.getElementById("inputNumber").value
    var inputZipcode = document.getElementById("inputZipcode").value
    var inputPassword1 = document.getElementById("inputPassword1").value
    var inputPassword2 = document.getElementById("inputPassword2").value
    if(inputName){
        profile.dispatch(updateData('username', inputName))
    }
    if(inputEmail){
        profile.dispatch(updateData('email', inputEmail))
    }
    if(inputZipcode){
        profile.dispatch(updateData('zipcode', inputZipcode))
    }
    document.getElementById("inputName").value=""
    document.getElementById("inputEmail").value=""
    document.getElementById("inputNumber").value=""
    document.getElementById("inputZipcode").value=""
    document.getElementById("inputPassword1").value=""
    document.getElementById("inputPassword2").value=""
}

//React component of the Profile
const ProfileView =(profile, state, dispatch) => {
    return(
        <div className='profileForm'>
            <ProfileCard dispatch = {dispatch} profile={profile} />
        </div>
    )
    
}
//Get profile from state and dispatch the update profile call to 
//the reducer
export default connect(
    (state) => {
        return {
            profile:state.profile
        }
    }
    ,  
)(ProfileView)