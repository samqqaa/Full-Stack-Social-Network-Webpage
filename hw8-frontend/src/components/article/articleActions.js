import Action, { resource } from '../../actions'
//Fetch articles from server
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
//Post an article to server
const addArticleWithImage = (text, file) => {
    return (dispatch) => {
        let fd = new window.FormData()
        fd.append('text', text)
        fd.append('image', file)
        resource('POST', 'article', fd, false)
        .then(r => {
            let newArticle = r.articles[0]
            dispatch({type: 'postNewArticle', newArticle})
        })
    }
}

const addArticle = (text, file) => {
    return (dispatch) => {
        resource('POST', 'article', {text: text, image:file})
        .then(r => {
            let newArticle = r.articles[0]
            dispatch({type: 'postNewArticle', newArticle})
        })
    }
}

// search Keyword
const searchKeyword = (keyword) => {
    return (dispatch) => {
        dispatch({ type: 'searchKeyword', keyword })
    }
}

const editArticle = (articleID, comment, commentID) => {
    return (dispatch) => {
        const payload = {text: comment}
        if (commentID){
            payload.commentId = commentID   
        }
        resource('PUT', `articles/${articleID}`, payload)
        .then(r => {
            let newArticle = r.articles[0]
            dispatch({type: 'postNewArticle', newArticle}) 
        })
    }
}

export { fetchArticles, addArticleWithImage, addArticle, searchKeyword, editArticle }