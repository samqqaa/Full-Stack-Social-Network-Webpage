import React from 'react'
import NewArticle from './newArticle'
import ArticlesView from './articlesView'

//Show new article card and old article cards
const Article = (props) => {
    return(
        <div className="row">
            <NewArticle />
            <ArticlesView articles={require('../../data/sampleArticle.json').articles}/>
        </div>
    )
}

export default Article