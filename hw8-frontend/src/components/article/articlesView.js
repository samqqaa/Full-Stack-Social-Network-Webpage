import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { searchKeyword, editArticle } from './articleActions'
var ContentEditable = require("react-contenteditable")

// Old article cards displaying old articles
const Card = ({article, index, comments, articles, state, dispatch}) => {
    let commentText = ''
    let articleText = ''
    return (
      <div className="row">
        <div className="col-sm-3">
          <div className="well">
           <p id="articleAuthor">{ article.author }</p>
           <img src={ (article.author in state.followers.followers)? state.followers.followers[article.author].avatar:state.profile.avatar } 
               className="img-circle" height="65" width="65" alt=""/>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="well">
            <img src={ article.img } className={(article.img)? 'display':'hidden'} height="200" width="240" alt=""/>
            <ContentEditable id='ContentEditable'className="text-justify ContentEditable" html={ article.text } onChange={(e)=>{articleText=e.target.value}} disabled={state.profile.username != article.author}></ContentEditable>
            <br/>
            <p> {new Date(article.date).toLocaleTimeString()}{"    "}{new Date(article.date).toLocaleDateString()}</p>
            <div id={article._id} className='hidden'>
                {comments.map((comments, index) => {
                 return(
                    <Comment key={index} comment={comments} dispatch = {dispatch} article={article} articles={articles} state={state}/>
                )
                })}
                <p><input id="postingComment" type="text" className="form-control" ref={(node) => commentText = node} placeholder="Post a comment.."/>
                <button type='button' className="btn btn-primary" onClick = {()=>{
                    dispatch(editArticle(article._id, commentText.value, -1))
                }}>Post</button></p>
            </div>
            <button type='button' className='btn btn-success' onClick={()=>toggleDisplay(article._id)}>Comment</button>
            <button id='editBtn' type='button' className="btn btn-info" onClick = {()=>{
                dispatch(editArticle(article._id, articleText))
            }} >Edit</button>
          </div>
        </div>
      </div>
    )
}

// Show or hide comments
const toggleDisplay = (articleID) => {
    if(document.getElementById(articleID).className =='display'){
        document.getElementById(articleID).className = 'hidden'
    }
    else{
        document.getElementById(articleID).className = 'display'
    }
}
// Comment card
const Comment = (comment, article, articles, state) =>{ 
    let newComment
    return(
        <div>
            <img className="col-sm-1" src={comment.state.articles.avatars[comment.comment.author]} 
                className="img-circle" height="30" width="30" alt=""/>
            <span className="text-left" >{comment.comment.author} :</span>
            <ContentEditable html={comment.comment.text} onChange={(e)=>{newComment=e.target.value}} disabled={comment.state.profile.username != comment.comment.author}></ContentEditable>
            <button type='button' className={comment.state.profile.username == comment.comment.author? 'display, btn btn-info':'hidden'}
            onClick={()=>{
                comment.dispatch(editArticle(comment.article._id, newComment, comment.comment.commentId))
            }}>Edit</button>
            <p> {new Date(comment.comment.date).toLocaleTimeString()}{"    "}
                {new Date(comment.comment.date).toLocaleDateString()}</p>
        </div>
)}

const ArticlesView = ({dispatch, articles, setState, state}) => {
    let keyword = ''
    return(
        <div className='articlesView'>
                <div className="form-group input-group">
                    <input id="searchInput"type="text" className="form-control" placeholder="Search.." ref={(node) => keyword = node} onChange={() => dispatch(searchKeyword(keyword.value))}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>        
                </div>
                {articles.map((article, index) => {
                    return (
                        <Card dispatch = {dispatch} state = {state} key={article._id} article={article} articles={articles} index={index} comments={article.comments} />
                    )
                })}
        </div>
    )
}

//Pull the articles from the state with sorting and keyword matching
export default connect(
  (state) => {
    const avatars = state.articles.avatars
    const keyword = state.articles.keyword
    let articles = Object.keys(state.articles.articles).map((id) => state.articles.articles[id])
    if (keyword && keyword.length > 0) {
      articles = articles.filter((a) => {
        return a.text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 ||
               a.author.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      })
    }
    // Sorting date
    articles = articles.sort((a,b) => {
          if (a.date < b.date)
            return 1
          if (a.date > b.date)
            return -1
          else return 0
    })
    // getting comments
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