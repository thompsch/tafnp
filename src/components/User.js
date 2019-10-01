import React, { useState } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "react-error-boundary";
import { Card, InputGroup, FormControl  } from "react-bootstrap";
import validator from "validator";
import ConfirmNumberModal from "./ConfirmNumberModal";
import { GoAlert, GoCheck, GoX } from "react-icons/go";
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
  const isValidNumber = (phone && validator.isMobilePhone(phone, 'en-US'));

  return (
    <ErrorBoundary>
        <Card>
          <Card.Header>Your Contact Information</Card.Header>
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
                {!isValidNumber && <GoX color="red" size='30' data-for='novalid' data-tip="This is not a valid phone number." />}
                { (isValidNumber && confirmed) ? 
                <GoCheck color="green" size='30' data-for='good' data-tip="This is a confirmed phone number." /> : 
                <GoAlert color="yellow" size='30' data-for='unconfirmed' data-tip="This number has not yet been confirmed." onClick={()=>setShowConfirm(true)}/>}   
              </InputGroup.Append>
            </InputGroup>
            {!isValidNumber && <label style={{color:'red'}}>Please enter a valid phone number</label>}
            </Card.Body>
            <ConfirmNumberModal close={()=>setShowConfirm(false)} show={showConfirm} phone={phone} id={user._id} confirmPhoneChanges={(e)=>confirmPhoneChanges(e)}></ConfirmNumberModal>
        </Card> 
        <ReactToolTip id='novalid'/>
        <ReactToolTip id='good'/>
        <ReactToolTip id='unconfirmed'/>
    </ErrorBoundary>
  );
  
function CheckNumber(e){
  var phone = e.target.value;

  if (!validator.isMobilePhone(phone, 'en-US')){
    //TODO: focus on form and add message...

    return;
  }
  else if (originalPhoneNumber !== e.target.value){
     setShowConfirm(true);
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
            user.phone = e.target.value;
            if (user.phone === originalPhoneNumber) setConfirmed(true);
            else if (confirmed===true) setConfirmed(false)
            setPhone(user.phone);
            ReactToolTip.rebuild();
            break;
        }
    }
    updateUser(user);
  }

  function confirmPhoneChanges(success){
    if (success) { setConfirmed(true);}
    else {
      setPhone(originalPhoneNumber);
      setConfirmed(user.confirmed)
  }
  }
}