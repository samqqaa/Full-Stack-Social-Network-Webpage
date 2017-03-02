import React from 'react'
import Nav from './nav'
import Headline from './headline'
import Following from './following'
import {connect} from 'react-redux'
import Article from '../article/article'


//Main page including headline, followers nad articles 
export const Main = ({user, profile}) => {
    return(
        <div>
            <Nav user={user} />
            <div className="container text-center">    
                <div className='container-fluid content'>
                    <div className='row'>
                        {/*left column*/}
                        <div className="col-sm-3 well">
                            <Headline user = {user} profile={profile} />
                            <hr/><br/>
                            <Following followings={require('../../data/followers.json').followings}/>
                        </div>
                        {/*middle column*/}
                        <div className='col-md-9'>
                            <Article />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
//Get user and profile from the state
export default connect(
    (state) => {
        return {
            user: state.user,
            profile:state.profile
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Main)