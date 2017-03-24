import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

//The register card in the landing page
const Register = ({location, userList, Register}) => {
    return(
      <div className="row">
        <h2 className ="col-xs-12"> New to RiceBook?</h2>
        <div className="well">
            <form className="form-horizontal"onSubmit={(e)=>{e.preventDefault(); register(Register)}}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Display Name</label>
                    <div className="col-sm-4">
                       <input type="text" className="form-control" id="inputName" required placeholder="Name"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-4">
                        <input type="email" className="form-control" id="inputEmail" required placeholder="Email Address"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Date of Birth</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="inputDOB" required pattern ="\d{2}[\-]\d{2}[\-]\d{2}" placeholder="mm-dd-yy" />
                    </div>
                    <h4 id="dobHint" className="col-sm-4"></h4>

                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-4">
                        <input type="phoneNumber"className="form-control" id="inputNumber" required pattern ="\d{3}[\-]\d{3}[\-]\d{4}" placeholder="xxx-xxx-xxxx"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Zipcode</label>
                    <div className="col-sm-4">
                        <input className="form-control" id="inputZipcode" required pattern ="\d{5}" placeholder="Zipcode"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-4">
                      <input type="password" className="form-control" id="inputPassword1" required placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Comfirm Password</label>
                    <div className="col-sm-4">
                       <input type="password" className="form-control" id="inputPassword2" required placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button value = "Submit"type="submit" className="btn btn-default">Register</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    )
}
// Redirecting to the main page after validation
const register = (Register)=>{
    var bday = document.getElementById("inputDOB").value
    var now = new Date()
    var thisYear = now.getFullYear()
    var dob = new Date(bday)
    now.setFullYear(thisYear-18)
    if (dob>now){
        document.getElementById("dobHint").innerHTML="You are not yet 18"
        return false;
    }
    else{
        document.getElementById("dobHint").innerHTML="Successfully registered"

    }
}


//Dispatch the register action to the reducer to register and Redirecting
//to the main page
export default connect(
    (state) => {
        return {
        }
    },  
    (dispatch) => {
        return {
            Register: () => dispatch({ type: "Register"}),
        }
    }
)(Register)