import React from 'react'
import { connect } from 'react-redux'
import { addArticle, addArticleWithImage } from './articleActions'
//Posting new article card
const NewArticle = ({dispatch}) => {
  let newArticle
  let newImage
    return(
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default text-left">

            <div className="panel-body">
              <textarea id="newPost" ref={(node) => newArticle = node} className="form-control" rows="3"placeholder="Share something.."></textarea>
              <br/>
              <button id="postButton" type="button" className="btn btn-default btn-sm" onClick={()=>{
                dispatch(addArticleWithImage(newArticle.value, newImage? newImage.files[0]:'')),
                newArticle.value=''
                newImage=undefined
                }}>
                <span className="glyphicon glyphicon-thumbs-up"></span> Post
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={()=>{newArticle.value = ""}}>Clear</button>
              <button type="button" className="btn btn-default btn-sm">
                <input  type="file" onChange={(e)=>newImage = e.target} />
              </button>

            </div>
          </div>
        </div>
      </div>
    )
}

//Dispatch the posting action to the main reducer to add new post into articles
export default connect()(NewArticle)
  