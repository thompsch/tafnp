import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertItem from "./AlertItem";

AlertList.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function AlertList(user) {
  var [user, setUser] = useState(user);

  return (
    <ErrorBoundary>
      <List>
        {user.alerts.map((item, index) => (
          <AlertItem
            key={item.type}
            index={index}
            item={item}
            toggleStatus={setAlertStatus}
          />
        ))}
      </List>
    </ErrorBoundary>
  );

  function setAlertStatus(index, item){
      user.alerts[index].subscribed = !item.subscribed;
      setUser(user);
      user.updateUser(user);
  }
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
