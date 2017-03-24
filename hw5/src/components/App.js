import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

//Redirecting to different page according to location of state
export const App = ({location, user}) => {
	if (location == 'main') {
		return (<Main />);
	} else if (location == 'profile') {
		return (<Profile/>);
	} else {
		return (<Landing/>);
	}
}
//Prototype is string
App.PropTypes = {
	location: PropTypes.string.isRequired
}
//Get location from state
export default connect(
    (state) => {
        return {
            location : state.navi.location
        }
    }, 
    (dispatch) => {
        return {
        }
    }
)(App)