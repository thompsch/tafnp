import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";

SavedModal.propTypes = {
    saveUser: PropTypes.func
  };

export default function SavedModal(func) {
  var [show, setShow] = useState(false);
  var [success, setSuccess] = useState(false);

  const handleClose = () =>setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ErrorBoundary>
      <Button variant="primary" onClick={()=>test()}>Save My Changes</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{success ? "Saved" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{success ? "Your preferences have been saved." : "Something went wrong. Please check your information and try again."}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </ErrorBoundary>
  )

  async function test(arf) {
    var result = await func.saveUser();
    setSuccess(result);
    handleShow()
  }
  }

