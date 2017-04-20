import { combineReducers } from 'redux'
//The reducer fuction input all the states that will be used.
const navi = (state = {error:"", registerHint:""}, action) => {
    switch(action.type) {
        //Register function to relocate to main page and update user list 
        case "Register":
            return {
                ...state, 
                location: "main"
            }
        //Error when registering
        case "registerError":
            return {...state, registerHint: action.error}
        case "registered":
            return {...state, registerHint: action.error}        
        //Redirect to main page
        case "goToMainPage":
            return{...state, location:"main"}
        //Redirect to profile page
        case "goToProfilePage":
            return{...state, location:"profile"}
        //Redirect to landing page
        case "Landing":
            return{...state, location:"landing"}
        case "Logout":
            return{
                location:"landing"
            }
        case 'loginError':
            return {...state, error: action.error}
        default:
            return state
    }
}
const profile = (state={username:'',headline:'',avatar:'',zipcode:'',email:'', phoneNumber:'123-321-1234', error:''}, action) => {
    switch(action.type){
        //Login function to redirect to main page
        case "Login": 
            return {
                ...state,
                location: "main",
                username: action.username
            }        
        case "clearProfile":
            return {}
        case 'updateProfile':
            if (action.headline) return { ...state, headline: action.headline }
            if (action.avatar) return { ...state, avatar: action.avatar, username:action.username }
            if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
            if (action.email) return { ...state, email: action.email }
            if (action.dob) return {...state, dob: action.dob}
            if (action.username) {return {...state, username: action.username}}
            if (action.password) {return {...state, error: action.password}}
        default:
            return state
    }
}
const articles = (state={articles: {}, searchKeyword: '', avatars: {}}, action) => {
    switch(action.type){
        case 'getArticles':
            return { ...state, articles: action.articles }
        case 'getAvatars':
            return { ...state, avatars: action.avatars }
        case "clearArticles":
            return {}
        case 'postNewArticle':
            let oldArticles = {...state.articles}
            oldArticles[action.newArticle._id]= action.newArticle 
            return{...state, articles:
                oldArticles
            }
        case 'searchKeyword':
            return { ...state, keyword: action.keyword }
        case 'editArticle':
            return state
        default:
            return state
    }
}
const followers = (state={followers:{}, error:''}, action) => {
    switch(action.type){
        case 'updateFollowers':
            return { ...state, error:'', followers: action.followers }
        case 'followingError':
            return {...state, error: action.error}
        case "clearFollowers":
            return {}
        default:
            return state
    }
}

const Reducer = combineReducers({
    profile, navi, articles, followers
})

export default Reducer
