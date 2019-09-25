import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import { Card, CardBody, Input, InputGroup, Label } from "reactstrap";

User.propTypes = {
  user: PropTypes.object
};

export default function User(user) {

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

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
          setName(e.target.value);
          break;
          }
          case 'useremail': {
          user.email = e.target.value;
          setEmail(e.target.value);
          break;
          }
          case 'userphone': {
            user.phone = e.target.value;
            setPhone(e.target.value);
            break;
      }
  }
 // onChange(index, item);
}
}
