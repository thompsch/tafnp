import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertItem from "./AlertItem";
import { ListGroup } from "react-bootstrap";

AlertList.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function AlertList(props) {
  var user = props;
  
  return (
    <ErrorBoundary>
      <ListGroup>
        {user.alerts.map((item, index) => (
          <AlertItem
            key={item.type}
            index={index}
            item={item}
            toggleStatus={setAlertStatus}
          />
        ))}
      </ListGroup>
    </ErrorBoundary>
  );

  function setAlertStatus(index, item){
      user.alerts[index].subscribed = !item.subscribed;
      user = (user);
      user.updateUser(user);
  }
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
