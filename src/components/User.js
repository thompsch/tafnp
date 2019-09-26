import React, { useState } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "react-error-boundary";
import { Card, InputGroup, FormControl  } from "react-bootstrap";
import validator from "validator";
import ConfirmNumberModal from "./ConfirmNumberModal";
import { GoAlert, GoCheck } from "react-icons/go";
import ReactToolTip from "react-tooltip";

User.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function User(props){
  var {user, updateUser} = props
  var [name, setName] = useState(user.name);
  var [email, setEmail] = useState(user.email);
  var [phone, setPhone] = useState();
  if (!phone) setPhone(user.phone);
  var [confirmed, setConfirmed] = useState(user.confirmed);
  
  const [originalPhoneNumber, setOPN] = useState();
  if (originalPhoneNumber===undefined) {
    setOPN(user.phone);
  }

  var [showConfirm, setShowConfirm] = useState();

  return (
    <ErrorBoundary>
        <Card>
          <Card.Header>Your Contract Information</Card.Header>
          <Card.Body>
            <InputGroup>
            <InputGroup.Prepend>Name</InputGroup.Prepend>
            <FormControl name="username" value={name} onChange={(e)=>onChangedInput(e)}/>
            </InputGroup>
            <InputGroup>
            <InputGroup.Prepend>Email</InputGroup.Prepend>
            <FormControl name="useremail" value={email} onChange={(e)=>onChangedInput(e)}/>
            </InputGroup>
            <InputGroup>
            <InputGroup.Prepend>Phone (for texts)</InputGroup.Prepend>
            <FormControl name="userphone" value={phone} onChange={(e)=>onChangedInput(e)} onBlur={(e)=>CheckNumber(e)}/>
            <InputGroup.Append>
               <ReactToolTip/>
                {confirmed ? 
                <GoCheck color="green" size='30' data-tip="This is a confirmed phone number." /> : 
                <GoAlert color="red" size='30' data-tip="This number has not yet been confirmed." onClick={()=>setShowConfirm(true)}/>}   
              </InputGroup.Append>
            </InputGroup>
            </Card.Body>
            <ConfirmNumberModal close={()=>setShowConfirm(false)} show={showConfirm} phone={phone} id={user._id} confirmPhoneChanges={(e)=>confirmPhoneChanges(e)}></ConfirmNumberModal>
        </Card> 
       
    </ErrorBoundary>
  );
function CheckNumber(e){
  var phone = e.target.value;

  if (originalPhoneNumber !== e.target.value){
     setShowConfirm(true);
    //call 'sendConfirmationSms' func.
    //keep dialog open until user enters code.
    //on comfirm, call setOPN()
  }
  if (!validator.isMobilePhone(phone, 'en-US')) {
    //TODO: add Verified/Unverified icon to phone line
    //TODO: this isn't a valid phone number; show an alert of some sort...
      //TODO: send SMS to verify new number
  }
}
  function onChangedInput(e){
    switch(e.target.name) {
          case 'username': {
            user.name = e.target.value;
            setName(user.name);
            break;
          }
          case 'useremail': {
            user.email = e.target.value
            setEmail(user.email);
            break;
          }
          case 'userphone': {
            setConfirmed(false);
            user.phone = e.target.value
            setPhone(user.phone);
            break;
        }
    }
    updateUser(user);
  }

  function confirmPhoneChanges(success){
    console.log('success in dialog?', success)
    if (success) { setConfirmed(true);}
    else {
      setPhone(originalPhoneNumber);
      setConfirmed(user.confirmed)
  }
  }
}