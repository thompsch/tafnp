import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import ChildItem from "./ChildItem";

ChildList.propTypes = {
  user: PropTypes.object
};
export default function ChildList(props) {

  var user = props;

  return (
    <ErrorBoundary>
      <List>
        {user.children.map((child, index) => (
          <ChildItem
            key={child.name}
            index={index}
            child={child}
            onChange={changedChild}
          />
        ))}
      </List>
    </ErrorBoundary>
  );

  function changedChild(index, child){
      user.children[index] = child;
      user = user;
      user.updateUser(user);
  }
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
