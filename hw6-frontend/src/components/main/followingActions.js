import { resource } from '../../actions'


// Get followers from the servers including headline and avater 
const fetchFollowers = (method, name) => {
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().followers.followers[name]) {
            return dispatch({type: 'followingError', error:`Already following ${name}`})
        }
        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
        .then((response) => {
            if (method == 'PUT' && response.following.indexOf(name) < 0) {
                return dispatch({type: 'followingError', error:`${name} is not a valid user`})
            }
            const followers = response.following.reduce((o, v, i) => { o[v] = {name: v}; return o }, {})
            const followerList = response.following.join(',')
            //Get 
            const headlinePromise = resource('GET', `headlines/${followerList}`)
                .then((response) => {
                    response.headlines.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.headline = s.headline
                        }
                    })
                })

            const avatarPromise = resource('GET', `avatars/${followerList}`)
                .then((response) => {
                    response.avatars.forEach((s) => {
                        const user = followers[s.username]
                        if (user) {
                            user.avatar = s.avatar
                        }
                    })
                })

            Promise.all([headlinePromise, avatarPromise]).then(() => {
                dispatch({type: 'updateFollowers', followers})
            })
        }).catch((err) => {
            dispatch({type: 'followingError', error: 'Error when following'})
        })
    }
}
export {fetchFollowers}