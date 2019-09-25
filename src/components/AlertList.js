import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertItem from "./AlertItem";

AlertList.propTypes = {
  user: PropTypes.object
};
export default function AlertList(user) {

  const [alerts, setAlerts] = useState(user.alerts);

  return (
    <ErrorBoundary>
      <List>
        {alerts.map((item, index) => (
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
      alerts[index].subscribed = !item.subscribed;
      setAlerts(alerts)
  }
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
