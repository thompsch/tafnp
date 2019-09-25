import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import ChildItem from "./ChildItem";

ChildList.propTypes = {
  user: PropTypes.object
};
export default function ChildList(user) {

  const [children, setChildren] = useState(user.children);

  return (
    <ErrorBoundary>
      <List>
        {children.map((child, index) => (
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
      children[index] = child;
      setChildren(children);
  }
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
