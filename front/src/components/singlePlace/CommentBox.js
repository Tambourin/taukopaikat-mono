import React from "react";
import { Comment, Header } from "semantic-ui-react";

import SubmitCommentForm from "./SubmitCommentForm";
import Comments from "./Comments";

const CommentBox = ({ place }) => {  
  return (    
    <Comment.Group style={{margin: "auto"}}>
      <Header as="h3" dividing> Kommentit </Header>
      <Comments comments={place.comments} />
      <SubmitCommentForm place={place} />
    </Comment.Group>
  )
}

export default CommentBox;