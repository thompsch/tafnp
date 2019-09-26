import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal, InputGroup, FormControl, Card } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";
import { confirmSms, checkCode } from "../stitch";

ConfirmNumberModal.propTypes = {
    show: PropTypes.bool
  };

export default function ConfirmNumberModal(props) {
  var close = props.close;
  var [show, setShow] = useState(false);
  var sekrit = '';
  var userId = props.id;

  if(!show && props.show) {
    setShow(true);
  } 
  var [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  const handleClose = () =>{
    //TODO: if we're not confirmed, reset the number.
    if (!success) props.confirmPhoneChanges(false);
    setShow(false);
    close();
  }
  return (
    <ErrorBoundary>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card>
              {!sent ? 'We need to confirm your phone number. Click the button below, and we\'ll send you a text message with a code. '
              :'The code has been sent to your phone. '
            }
            </Card>
            <Card>
            <Button disabled={sent} variant={sent?"secondary":"primary"} onClick={sendSms}>{!sent?"Send SMS":"Code sent!"}</Button>
            </Card>
        </Modal.Body>
        <Modal.Footer>
          <Card>
        Please enter the code in the box below, and then click "Confirm".
            <FormControl id='sekrit' placeholder="123456" onChange={(e)=>{sekrit = e.target.value}}></FormControl>
          <Button variant="primary" onClick={sendCode}>Confirm</Button>
          </Card>
          <Button variant="light" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      </ErrorBoundary>
  )
 
  function sendSms() {
    setSent(true);
    confirmSms(props.phone);
  }

  async function sendCode(){
    console.log('sekrit', props.id, sekrit)
    await checkCode(props.id, props.phone, sekrit).then(success=>{
      if (success){
        setSuccess(true);
        setShow(false);
        props.confirmPhoneChanges(true);
        //set phone number to new value
        //add checkbox to UI
      } else {
        setSuccess(false);
        props.confirmPhoneChanges(false);
      }
    }
    )

  }

  }

