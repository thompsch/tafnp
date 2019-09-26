import React, { useState } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "react-error-boundary";
import { Card, InputGroup, FormControl  } from "react-bootstrap";
import validator from "validator";

User.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function User(props){
  var {user, updateUser} = props
  var [name, setName] = useState(user.name);
  var [email, setEmail] = useState(user.email);
  var [phone, setPhone] = useState(user.phone);
  
  return (
    <ErrorBoundary>
        <Card>
          <Card.Header>Your Contract Information</Card.Header>
          <Card.Body>
            <InputGroup.Prepend>Name</InputGroup.Prepend>
            <FormControl name="username" value={name} onChange={(e)=>onChangedInput(e)}/>
            <FormControl name="useremail" value={email} onChange={(e)=>onChangedInput(e)}/>
            <FormControl name="userphone" value={phone} onChange={(e)=>onChangedInput(e)} onBlur={(e)=>CheckNumber(e)}/>
            </Card.Body>
        </Card> 
    </ErrorBoundary>
  );
function CheckNumber(e){
  var phone = e.target.value;
  console.log('checking phone', phone, validator.isMobilePhone(phone, 'en-US'))
  if (!validator.isMobilePhone(phone, 'en-US')){
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
            user.phone = e.target.value
            setPhone(user.phone);
            break;
        }
    }
    updateUser(user);
  }
}