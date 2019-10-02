import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import ChildItem from "./ChildItem";
import { ListGroup } from "react-bootstrap";

ChildList.propTypes = {
  user: PropTypes.object
};
export default function ChildList(props) {

  var user = props;

  return (
    <ErrorBoundary>
      <ListGroup>
        {user.children.map((child, index) => (
          <ChildItem
            key={child.name}
            index={index}
            child={child}
            onChange={changedChild}
          />
        ))}
      </ListGroup>
    </ErrorBoundary>
  );

  function changedChild(index, child){
      user.children[index] = child;
      user = user;
      user.updateUser(user);
  }
}

