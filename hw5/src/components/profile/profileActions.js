import { resource } from '../../actions'

const updateData = (category, data) => {
    return (dispatch) => {
        if(data){
            let payload = {}
            payload[category] = data
            resource('PUT', category, payload).then(r => {
                let action = { type: 'updateProfile' }
                action[category] = r[category]
                dispatch(action)
            })
        }
    }
}

const fetchData = (category) => {
    return (dispatch) => {
        resource('GET', category).then(r => {
            let action = {type: 'updateProfile'}
            switch(category){
                case 'avatars':
                    action.avatar = r.avatars[0].avatar
                    action.username = r.avatars[0].username
                    //username and avatar
                    break
                case 'email':
                    action.email = r.email
                    break
                case 'zipcode':
                    action.zipcode = r.zipcode
                    break
                case 'dob':
                    action.dob = new Date(r.dob).toDateString()
                    break          
                case 'headlines':
                    action.headline = r.headlines[0].headline 
            }dispatch(action)
        })
    }
}

const fetchProfile = () => {
    return (dispatch) => {
        dispatch(fetchData('headlines'))
        dispatch(fetchData('avatars'))
        dispatch(fetchData('zipcode'))
        dispatch(fetchData('email'))
        dispatch(fetchData('dob'))
    }
}

export { fetchProfile, updateData }