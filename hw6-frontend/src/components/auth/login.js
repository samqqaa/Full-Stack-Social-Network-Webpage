import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { userLogin } from './authActions'
import { resource } from '../../actions'
//Set new user
var newUser={
    name : "",
    password : ""
}
//The login card
const Login = ({dispatch, error}) => {
    return(
      <div className="row">
        <h2 className ="col-xs-12"> Welcome to RiceBook!</h2>
        <div className="well">
            <form className="form-horizontal" onSubmit={(event)=>{
                event.preventDefault()
                newUser.name=document.getElementById("inputName").value;
                newUser.password=document.getElementById("inputPassword").value;
                dispatch(userLogin(newUser.name, newUser.password))
                }}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">User Name</label>
                    <div className="col-sm-4">
                        <input  type = "text"className="form-control" id="inputName" required placeholder="User Name"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-4">
                        <input type="password" className="form-control" id="inputPassword" required placeholder="Password"/>
                        <h4>{error}</h4>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-4">
                        <button id='signin'type="submit" className="btn btn-default" >Sign in</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )}

//Get error from the state
export default connect(
    (state) => {
        return {
            error:state.navi.error
        }
    }  
)(Login)