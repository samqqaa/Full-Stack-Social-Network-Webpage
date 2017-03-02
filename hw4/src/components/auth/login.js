import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

//Set new user
var newUser={
    name : "",
    password : ""
}
//The login card
const Login = ({location, userList, Login}) => {
    return(
      <div className="row">

        <h2 className ="col-xs-12"> Welcome to RiceBook!</h2>
        <div className="well">
            <form className="form-horizontal" onSubmit={()=>goToMainPage(location, Login)}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">User Name</label>
                    <div className="col-sm-4">
                        <input  type = "text"className="form-control" id="inputEmail" required placeholder="User Name">
                    </input>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-4">
                    <input type="password" className="form-control" id="inputPassword3" required placeholder="Password">
                    </input>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-4">
                    <button type="submit" className="btn btn-default" >Sign in</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )}
//Redirect to main page after validation
const goToMainPage=(location, Login)=>{
    Login()
}

//Get location and user from the state
//Dispatch the login request to the dispatcher, redirecting to main page
export default connect(
    (state) => {
        return {
            location: state.location,
            user: state.user
        }
    },  
    (dispatch) => {
        return {
            Login : () => dispatch({type:'Login'})
        }
    }
)(Login)