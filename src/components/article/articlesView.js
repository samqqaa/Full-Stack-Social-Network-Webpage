import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { searchKeyword } from './articleActions'
// Old article cards displaying old articles
const Card = ({article, index, comments, articles,state}) => (
      <div className="row">
        <div className="col-sm-3">
          <div className="well">
           <p>{ article.author }</p>
           <img src={ (article.author in state.followers.followers)? state.followers.followers[article.author].avatar:state.profile.avatar } 
               className="img-circle" height="65" width="65" alt=""/>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="well">
            <img src={ article.img } className={(article.img)? 'display':'hidden'} height="200" width="240" alt=""/>
            <p className="text-justify">{ article.text }</p>
            <br/>
            <p> {new Date(article.date).toLocaleTimeString()}{"    "}{new Date(article.date).toLocaleDateString()}</p>
            <div id={article._id} className='hidden'>
                {comments.map((comment, index) => {
                 return(
                    <Comment key={index} comment={comment} article={article} articles={articles} state={state}/>
                )

                })}
                <p><input id="postingComment" type="text" className="form-control" placeholder="Post a comment.."/>
                <button type='button' className="btn btn-primary">Post</button></p>

            </div>
            <button type='button' className='btn btn-success' onClick={()=>toggleDisplay(article._id)}>Comment</button>
            <button type='button' className="btn btn-info">Edit</button>
          </div>
        </div>
      </div>
)
const toggleDisplay = (articleID) => {
    if(document.getElementById(articleID).className =='display'){
        document.getElementById(articleID).className = 'hidden'
    }
    else{
        document.getElementById(articleID).className = 'display'
    }
}
const Comment = (comment, article, articles, state) => (
        <div>
            <img className="col-sm-1" src={
                comment.comment.author in comment.state.followers.followers? comment.state.followers.followers[comment.comment.author].avatar:'' } 
                className="img-circle" height="30" width="30" alt=""/>
            <span className="text-left">{comment.comment.author} :
            {comment.comment.text}</span>
            <p> {new Date(comment.comment.date).toLocaleTimeString()}{"    "}{new Date(comment.comment.date).toLocaleDateString()}</p>
        </div>
)

//Change ArticlesView to function
const ArticlesView = ({dispatch, articles, setState, state}) => {
    return(
        <div className='articlesView'>
                <div className="form-group input-group">
                    <input id="searchInput"type="text" className="form-control" placeholder="Search.." onChange={() => search(dispatch)}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>        
                </div>
                {articles.map((article, index) => {
                    return (
                        <Card state = {state} key={article._id} article={article} articles={articles} index={index} comments={article.comments} />
                    )
                })}
        </div>
    )
}

//Pull the articles from the state
export default connect(
  (state) => {
    const avatars = state.articles.avatars
    const keyword = state.articles.searchKeyword
    let articles = Object.keys(state.articles.articles).map((id) => state.articles.articles[id])
    if (keyword && keyword.length > 0) {
      articles = articles.filter((a) => {
        return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
               a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      })
    }
    articles = articles.sort((a,b) => {
          if (a.date < b.date)
            return 1
          if (a.date > b.date)
            return -1
          else return 0
    })
    articles.map((a) => {
      return {...a, avatar: avatars[a.author], comments: a.comments.map((c) => {
        return { ...c, avatar: avatars[c.author] }
      })}
    })
    return {
      username: state.profile.username,
      articles,
      state:state
    }
  }
)(ArticlesView)