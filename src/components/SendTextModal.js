import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";

SendTextModal.propTypes = {
    message: PropTypes.string,
    sendText: PropTypes.func
  };

export default function SendTextModal(props) {
  var [show, setShow] = useState(false);
  var close = props.close;
  var message = props.message;
  var sendText = props.sendText;

  if(!show && props.show) {
    setShow(true);
  } 

  const handleClose = () =>{
    if (show) setShow(false);
    close();
  }
    
  return (
    <ErrorBoundary>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm the Message Before Sending
            </Modal.Title>
            </Modal.Header>
        <Modal.Body>
            {message}
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Cancel</Button>
               <Button variant="danger" onClick={sendAndClose}>Send It!</Button> 
            </Modal.Footer>
        </Modal.Body>
      </Modal>
      </ErrorBoundary>
  )

  function sendAndClose(){
   sendText();
   handleClose();
  }
}

