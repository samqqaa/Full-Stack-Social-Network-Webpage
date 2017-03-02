import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
//The navigation bar
//It has links to profile page and logout
const Nav = ({location, toProfilePage, toMainPage, toLandingPage, logout, user}) => {
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
                    <li className="active"><a href="#" onClick={()=> goToMainPage(location, toMainPage)}>Home</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={()=> goToProfilePage(location, toProfilePage)}><span className="glyphicon glyphicon-user"></span> My Profile</a></li>
                    <li><a href="#" onClick={()=> logout()}><span className="glyphicon glyphicon-user"></span> Logout</a></li>
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
//Function to redirect to profile page
const goToProfilePage=(location, toProfilePage)=>{
    toProfilePage()
}
//Function to redirect to main page
const goToMainPage=(location, toMainPage)=>{
    toMainPage()
}
//Function to redirect to landing page and log out
const goToLandingPage=(location, toLandingPage)=>{
    toLandingPage()
}



//Get location from state and dispatch three redirecting functions
//to the reducer
export default connect(
    (state) => {
        return {            
            location: state.location
        }
    },
    (dispatch) => {
        return {
            toProfilePage: () => dispatch({ type: "goToProfilePage"}),
            toMainPage: () => dispatch({type:"goToMainPage"}),
            logout: () => dispatch({type:"Landing"})
        }
    }
)(Nav)