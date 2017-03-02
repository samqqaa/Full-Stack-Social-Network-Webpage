import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
//Get sample articles from file
const sampleArticle = require('../../data/sampleArticle.json')
const articles = sampleArticle.articles
//Old article cards displaying old articles
const Card = ({article, index}) => (
      <div className="row">
        <div className="col-sm-3">
          <div className="well">
           <p>{ article.author }</p>
           <img src={ article.img } className="img-circle" height="65" width="65" alt=""/>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="well">
            <p>{ article.text}</p>
            <br/>
            <p> {new Date(article.date).toLocaleTimeString()}{"    "}{new Date(article.date).toLocaleDateString()}</p>
            <button type='button' className='btn btn-success'>Comment</button>
            <button type='button' className='btn btn-success'>Edit</button>
          </div>
        </div>
      </div>
)
//React component of articles
class ArticlesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {article: props.articles, articlesDisplayed: props.articles}
    }
    //Update the state and display the new article
    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles,
            articlesDisplayed: nextProps.articles
        })
    }
    render() {
        return(
            <div className='articlesView'>
                    <div className="form-group input-group">
                        <input id="searchInput"type="text" className="form-control" placeholder="Search.." onChange={() => search(this)}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                        </span>        
                    </div>
                    {this.state.articlesDisplayed.map((article, index) => {
                        return (
                            <Card key={index} article={article} index={index}/>
                        )
                    })}
            </div>
        )
    }
}
//Search for authors or contexts that match the keyword 
const search = (self) => {
    var keyWord = document.getElementById('searchInput').value
    if(keyWord == "") {
        self.setState({
            ...self.state,
            articlesDisplayed: self.state.articlesDisplayed
        })
    }
    else {
        self.setState({
            ...self.state,
            articlesDisplayed: self.state.articles.filter((article) => {
                if(article.author.indexOf(keyWord) == -1 && article.text.indexOf(keyWord) == -1) {
                    return false;
                }
                return true;
            })
        })   
    }
}
//Pull the articles from the state
export default connect(
    (state) => {
        return {
            articles: state.article
        }
    },  
    (dispatch) => {
        return {

        }
    }
)(ArticlesView)