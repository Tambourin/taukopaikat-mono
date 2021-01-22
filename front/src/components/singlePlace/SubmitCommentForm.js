import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../reducers/placesReducer";
import { loginAction } from "../../reducers/userReducer";
import { Form, Button } from "semantic-ui-react";
import ConfirmSendComment from "./ConfirmSendComment";

const MIN_COMMENT_LENGTH = 15;

const SubmitCommentForm = ({ place, addComment, user, loginAction }) => {
  const [ newComment, setNewComment ] = useState("");
  const [ modalOpen, setModalOpen ] = useState(false);

  const sendComment = () => { 
    setModalOpen(false);
    addComment(place, {
      content: newComment,
      author: user.nickname
    });
    setNewComment("");
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  if(!user) {
    return (
      <Button basic onClick={loginAction}>Kirjaudu sisään kommentoidaksesi</Button>
    )
  }

  return (
    <Form onSubmit={() => setModalOpen(true)}> 
      <Form.TextArea 
        value={newComment}
        onChange={(event, data) => setNewComment(data.value)}
        placeholder="Kirjoita tähän kommenttisi tai arviosi"
      />                        
      <Button 
        type="submit"
        disabled={newComment.length < MIN_COMMENT_LENGTH}
        content={newComment.length < MIN_COMMENT_LENGTH ? "Kommentti liian lyhyt" : "Jätä oma kommenttisi paikasta"}
        labelPosition="left" 
        icon="edit" 
        color="olive"              
      />
      <ConfirmSendComment 
        modalOpen={modalOpen}        
        closeModal={closeModal}
        placeName={place.name}
        sendComment={sendComment}
        user={user}
        commentContent={newComment} 
      />
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}
export default connect(mapStateToProps, { addComment, loginAction })(SubmitCommentForm);
