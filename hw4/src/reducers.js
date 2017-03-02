const initial = require('./data/Initial.json')
const sampleArticle = require('./data/sampleArticle.json')
const sampleProfile = require('./data/profile.json')
//The reducer fuction input all the states that will be used.
const Reducer = (state =  {
    location: initial.location,
    userList: initial.userList,
    user: initial.user,
    article: sampleArticle.articles,
    profile: sampleProfile.initProfile
}, action) => {
    switch(action.type) {
        //Register functino to relocate to main page and update user list 
        case "Register":
            return {
                ...state, 
                location: "main",
                userList:[
                    ...state.userList, {
                    }
                ]
            }
        //Login function to redirect to main page
        case "Login":
            return {
                ...state,
                location: "main"
            }
        //Redirect to main page
        case "goToMainPage":
            return{...state, location:"main"}
        //Redirect to profile page
        case "goToProfilePage":
            return{...state, location:"profile"}
        //Redirect to landing page
        case "Landing":
            return{...state, location:"landing"}
        //Update the user profile
        case "updateProfile":
            return {
                ...state,
                profile: action.newProfile
            }
        //Post the new article and append it onto the old articles
        case "postNewArticle":
            return{...state,
            article:[
                {
                    text:action.text,
                    author:"",
                    img:"",
                    date: Date.now()
                },
                ...state.article
            ]}
        default:
            return state
    }
}
export default Reducer
