import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../auth/authActions'
//The navigation bar
//It has links to profile page and logout
const Nav = ({location, toProfilePage, toMainPage, toLandingPage, logout, user, dispatch}) => {
    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                </button>
                <a className="navbar-brand" href="#">Ricebook</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="#" onClick={()=>dispatch({ type: "goToMainPage"}) }>Home</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={()=>dispatch({ type: "goToProfilePage"}) }><span className="glyphicon glyphicon-user"></span> My Profile</a></li>
                    <li><a href="#" onClick={()=>dispatch(userLogout())}><span className="glyphicon glyphicon-user"></span> Logout</a></li>
                </ul>
                </div>
            </div>
        </nav>
    )
}
//Prototypes of navigation bar
Nav.propsType= {
    editProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}
//Get location from state and dispatch three redirecting functions
//to the reducer
export default connect(
    (state) => {
        return {            
            location: state.location
        }
    }
)(Nav)