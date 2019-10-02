import React, {useState} from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl, ListGroup } from "react-bootstrap";

ChildItem.propTypes = {
  child: PropTypes.object,
  toggleStatus: PropTypes.func,
};

export default function ChildItem(props) {

  const {child, index, onChange} = props;

  const [name, setName] = useState(child.name);
  const [grade, setGrade] = useState(child.grade);

  return (
  
      <ListGroup.Item>
        <InputGroup>
        <InputGroup.Prepend>Name</InputGroup.Prepend><FormControl name='name' value={name} onChange={e=>onChangedInput(e)}/>
        </InputGroup>
        <InputGroup>
        <InputGroup.Prepend>Grade</InputGroup.Prepend>
        <FormControl name='grade' value={grade} onChange={e=>onChangedInput(e)}/>
        </InputGroup>
      </ListGroup.Item>

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
