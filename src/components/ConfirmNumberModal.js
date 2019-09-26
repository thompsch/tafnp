import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";
import { confirmSms } from "../stitch";

ConfirmNumberModal.propTypes = {
    show: PropTypes.bool
  };

export default function ConfirmNumberModal(props) {
    console.log(props)
  var [show, setShow] = useState(false);

  //todo: this is borked when trying to close, b/c props.show is always true...
  if(!show && props.show) setShow(true);
  console.log('show?', show)
  var [success, setSuccess] = useState(false);

  const handleClose = () =>setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ErrorBoundary>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>We need to confirm your phone number. We'll send you a text message with a code. Please enter the 
            code in the box below, and then click "Confirm".
            <Button variant="primary" onClick={sendSms}>
            Send SMS
          </Button>
        </Modal.Body>
        <Modal.Footer>
            <FormControl placeholder="123456"></FormControl>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      </ErrorBoundary>
  )
 
  function sendSms() {
    confirmSms(props.phone);
  }

  }

