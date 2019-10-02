import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";
import { softDeleteUser } from "./../stitch/";
import { GoAlert, GoQuestion } from "react-icons/go";
import { usersCollection } from "./../stitch";

DeleteUserModal.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.string,
    user: PropTypes.object,
    field: PropTypes.string,
    newValue: PropTypes.string,
    oldValue: PropTypes.string,
    close: PropTypes.func
  };

export default function DeleteUserModal(props) {
  var [user, setUser] = useState(null)
  if (!user && props.user) setUser(props.user);
  var [field, setField] = useState(null)
  if (!field && props.field) setField(props.field);
  var [newValue, setNewValue] = useState(null)
  if (!newValue && props.newValue) setNewValue(props.newValue);
  var [oldValue, setOldValue] = useState(null)
  if (!oldValue && props.oldValue) setOldValue(props.oldValue);
  
  var [show, setShow] = useState(false);
  var close = props.close;

  if(!show && props.show) {
    setShow(true);
  } 

  const handleClose = () =>{
    setShow(false);
    close();
  }

  function body(){
    const foo = 
      props.type == "delete" ? 
        <span><b>Are you sure you want to delete the following user from the system? </b><br/> 
          {user && (user.name +" ("+user.email +")")}</span>
        : 
        <span><b>Are you sure you want to make the following changes?</b><br/> 
          <i>{field}</i>: &quot;{oldValue}&quot; <i>changed to</i>  &quot;{newValue}&quot;
          </span>
    return (foo);
    }
    
  return (
    <ErrorBoundary>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.type == "delete" ?
            <span><GoAlert size='50' color='red'/><span>Delete User?</span></span>
            :
            <span><GoQuestion size='50' color='gold'/><span>Update User?</span></span>}
            </Modal.Title>
            </Modal.Header>
        <Modal.Body>
            {body()}
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            {props.type == 'delete' ?
              <Button variant="danger" onClick={deleteUser}>Delete User</Button> : 
              <Button variant="primary" onClick={()=>updateUser()}>Update User</Button>
            }
            </Modal.Footer>
        </Modal.Body>
      </Modal>
      </ErrorBoundary>
  )
 
  function deleteUser(){
    softDeleteUser(user).then(result=>{
      console.log(result)
      //if (result){
        //todo: display result? Or just reload the page?
        handleClose();
     // }
    })
  }

  function updateUser(){
    const set = { $set: { }}
    set.$set[field] = newValue;
    usersCollection.updateOne({'_id':user._id}, set, {'upsert':false})
    .then(r => {
      console.log('user updated', r);
      handleClose();
    }).catch(e => {
      console.error('stich error', e)
      handleClose();
    }).finally(()=>{
      handleClose();
    });
  }
}

