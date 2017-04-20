import React from 'react'
import Nav from '../main/nav'
import Headline from '../main/headline'
import Following from '../main/following'
import {connect} from 'react-redux'
import Article from '../article/article'
import Login from './login'
import Register from './register'
//The landing page of the Ricebook
export const Landing = () => {
    return(
        <div>
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <a className="navbar-brand" href="#">Ricebook</a>
                    </div>
                </div>
            </nav>
            <Login/>
            <hr/>
            <Register/>
        </div>
    )
}

export default connect(
    (state) => {
        return {
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Landing)