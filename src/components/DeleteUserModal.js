import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal, InputGroup, FormControl, Card } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";
import { softDeleteUser } from "./../stitch/";
import { GoAlert } from "react-icons/go";

DeleteUserModal.propTypes = {
    show: PropTypes.bool
  };

export default function DeleteUserModal(props) {
  var close = props.close;
  var user = props.user;
  var [show, setShow] = useState(false);

  if(!show && props.show) {
    setShow(true);
  } 

  const handleClose = () =>{
    setShow(false);
    close();
  }

  return (
    <ErrorBoundary>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><GoAlert size='50' color='red'/>Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <b>Are you sure you want to delete the following user from the system?</b>
            <br/>
            {user &&  user.name + " ("  + user.email + ")" }
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="danger" onClick={deleteUser}>Delete User</Button>
            </Modal.Footer>
        </Modal.Body>
       
      </Modal>
      </ErrorBoundary>
  )
 
  function deleteUser(){
      console.log('calling softDelete', user)
    softDeleteUser(user);
  }
}

