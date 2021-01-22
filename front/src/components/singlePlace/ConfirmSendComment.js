import React from "react";
import { Modal, Button } from "semantic-ui-react";

const ConfirmSendComment = ({
  modalOpen,
  closeModal,
  placeName,
  sendComment,
  user,
  commentContent
}) => {
  return (
    <Modal open={modalOpen} size="small">
      <Modal.Header>
        Lähetä kommentti paikasta {placeName}:
      </Modal.Header>
      <Modal.Content>
        <h4>{user.nickname}</h4>        
        {commentContent}
      </Modal.Content>
      <Modal.Actions>
        <Button autoFocus primary onClick={sendComment}>Lähetä</Button>
        <Button onClick={closeModal}>Peruuta</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmSendComment;