import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Card, CardBody, Input, InputGroup, Label } from "reactstrap";

ChildItem.propTypes = {
  child: PropTypes.object,
  toggleStatus: PropTypes.func,
};

export default function ChildItem(props) {

  const {child, index, onChange} = props;

  const [name, setName] = useState(child.name);
  const [grade, setGrade] = useState(child.grade);

  return (
  
      <Todo>
        <InputGroup>
        <Label>Name</Label><Input name='name' value={name} onChange={e=>onChangedInput(e)}/>
        </InputGroup>
        <InputGroup>
        <Label>Grade</Label>
        <Input name='grade' value={grade} onChange={e=>onChangedInput(e)}/>
        </InputGroup>
      </Todo>

  );

  function onChangedInput(e){
     
      switch(e.target.name) {
            case 'name': {
            child.name = e.target.value;
            setName(e.target.value);
            break;
            }
            case 'grade': {
            child.grade = e.target.value;
            setGrade(e.target.value);
            break;
        }
    }
    onChange(index, child);
  }
  function changeState(index, child){
    onChange(index,child);
  }
}

const Todo = styled(Card)`
  margin: 4px auto;
  :first-of-type {
    margin-top: 0px;
  }
`;
const Layout = styled(CardBody)`
  display: flex;
  align-items: top;
  padding: 10px !important;
`;
const Text = styled.span`
  font-size: 18px;
  line-height: 24px;
  margin-left: 10px;
  max-width: calc(100% - 24px - 10px);
`;