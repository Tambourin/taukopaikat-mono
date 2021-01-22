import React from "react";
import { Comment } from "semantic-ui-react";

const Comments = ({ comments }) => {
  if(!comments) {
    return null;
  }
  
  return (
    <div>
      {comments.map(comment => {
        const date = new Date(comment.date);
        return (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author>{comment.author}</Comment.Author>
              <Comment.Metadata>
                <div>{date.toLocaleString()}</div>
              </Comment.Metadata>
              <Comment.Text>
                {comment.content}              
              </Comment.Text>
            </Comment.Content>
          </Comment>
        )
      })}
     </div> 
  )
}

export default Comments;