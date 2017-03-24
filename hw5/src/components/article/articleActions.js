import Action, { resource } from '../../actions'
//read n check again
const fetchArticles = () => {
    return (dispatch, getState) => {
        resource('GET', 'articles').then(r => {
            let articles = {}
            r.articles.map((singleArticle) => {
                articles[singleArticle._id] = singleArticle
            })
            dispatch({type:'getArticles', articles})
            const avatars = getState().articles.avatars
            const authors = new Set(r.articles.reduce((o, article) => {
                article.comments.map((c) => c.author).forEach((author) => o.push(author))
                return o
            }, []).filter((author) => !avatars[author]))
            if (authors.size > 0) {
                resource('GET', `avatars/${[...authors].join(',')}`)
                .then((r) => {
                    r.avatars.forEach((s) => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({ type: 'getAvatars', avatars })
                })
            }                
        }) 
    }
}
const postArticle = (text, file) => {
    return (dispatch) => {
        let payload = {}
        payload.text = text
        resource('POST', 'article', payload)
        .then(r => {
            let newArticle = r.articles[0]
            dispatch({type: 'postNewArticle', newArticle})
        })
    }
}

const searchKeyword = (keyword) => {
    return (dispatch) => {
        dispatch({ type: 'searchKeyword', keyword })
    }
}


export { fetchArticles, postArticle, searchKeyword }