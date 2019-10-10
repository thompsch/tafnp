import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Modal, InputGroup, FormControl, Card } from "react-bootstrap";
import ErrorBoundary from "react-error-boundary";
import { confirmSms, checkCode } from "../stitch";
import validator from "validator";

ConfirmNumberModal.propTypes = {
    show: PropTypes.bool
  };

export default function ConfirmNumberModal(props) {
  var close = props.close;
  var [show, setShow] = useState(false);
  var sekrit = '';
  var userId = props.id;

  const sekritInput = React.createRef();

  if(!show && props.show) {
    setShow(true);
  } 
  var [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  if (success) close();

  const handleClose = () => {
    if (show) setShow(false);
    close();
  }
  
  return (
    <ErrorBoundary>
      <Modal show={show} onHide={handleClose} dialogClassName='secondary'>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card className="text-center"  bg='light'>
              {!sent ? 'We need to confirm your phone number. Click the button below, and we\'ll send you a text message with a code. '
              :'The code has been sent to your phone. '
            }
            </Card>
            <Card>
            <Button disabled={sent} variant={sent?"secondary":"primary"} onClick={sendSms}>{!sent?"Send me a text":"Code sent!"}</Button>
            </Card>
            <hr/>
            <Card className="text-center" bg='light'>
            <span>Please enter the code in the box below, and then click "Confirm".</span>
            <FormControl  disabled={!sent} ref={sekritInput} id='sekrit' placeholder="123456" onChange={(e)=>{sekrit = e.target.value}}></FormControl>
          <Button  disabled={!sent} variant="primary" onClick={()=>sendCode(handleClose)}>Confirm</Button>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          
          <Card>
          <Button variant="light" onClick={handleClose}>Cancel</Button>
          </Card>
        </Modal.Footer>
      </Modal>
      </ErrorBoundary>
  )
 
  function sendSms() {
    if (!validator.isMobilePhone(props.phone, 'en-US')){
      //TODO: focus on form and add message...
      return;
    }
    setSent(true);
    confirmSms(props.phone);
  }

  async function sendCode(handleClose){
    if (sekrit === '') {
      //TODO: focus on formcontrol and add message....
      sekritInput.current.focus();
      return;
    }
    await checkCode(props.id, props.phone, sekrit).then(success=>{
      console.log(success);
      setSuccess(success);
      props.confirmPhoneChanges(success);
      handleClose();
    })
  }
}

