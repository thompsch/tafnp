import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import { Card, CardBody, Input, InputGroup, Label } from "reactstrap";

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
            <Input name="username" value={name} onChange={e=>onChangedInput(e)}/>
            <Input name="useremail" value={email} onChange={e=>onChangedInput(e)}/>
            <Input name="userphone" value={phone} onChange={e=>onChangedInput(e)}/>
        </Card> 
    </ErrorBoundary>
  );

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
    console.log('sending user', user)
    updateUser();
  }
}