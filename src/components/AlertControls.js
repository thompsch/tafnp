import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Button } from "reactstrap";
import TodoInput from "./TodoInput";
import { isArray } from "util";

AlertControls.propTypes = {
  alerts: PropTypes.array,
  actions: PropTypes.object,
};
export default function AlertControls(props) {

  console.log('AlertContols', props)
  const { alerts, actions } = props;
  console.log('alerts',alerts, isArray(alerts) )
  const [inputText, setInputText] = useState("");
  const handleInput = e => setInputText(e.target.value);
  const handleAddTodo = () => {
    if (inputText) {
      actions.addTodo(inputText);
      setInputText("");
    }
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Layout>
      <TodoInput
        value={inputText}
        addTodo={handleAddTodo}
        onChange={handleInput}
        onKeyDown={handleKeyPress}
      />
      
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-alerts: center;
  width: 450px;
`;
const ControlBar = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const CleanupButton = styled(Button)`
  background-color: #f83d0e !important;
`;
const SelectAllButton = props => {
  const Selector = styled(Button)`
    color: black;
    border: 0.5px solid rgba(0, 0, 0, 0.6) !important;
    margin-right: 8px;
  `;
  return (
    <Selector color="inverted" onClick={props.onClick}>
      {props.selected ? (
        <span>
          <CheckedIcon />
        </span>
      ) : (
        <span>
          <UncheckedIcon /> Complete All
        </span>
      )}
    </Selector>
  );
};
