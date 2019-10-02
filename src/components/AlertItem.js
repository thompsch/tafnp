import React, {useState} from "react";
import PropTypes from "prop-types";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { ListGroup } from "react-bootstrap";

AlertItem.propTypes = {
  item: PropTypes.object,
  toggleStatus: PropTypes.func,
};

export default function AlertItem(props) {

  const {item, index, toggleStatus} = props;

  const [check, setCheck] = useState(item.subscribed)

  function Checkbox() { return (item.subscribed ? <FaRegCheckSquare color='green'/> : <FaRegSquare color="gray"/>)}
  return (
    <ListGroup.Item onClick={()=>changeState(index, item)}>
     
        <Checkbox />  {item.type}

    </ListGroup.Item>
  );

  function changeState(index, item){
    setCheck(!item.subscribed);
    toggleStatus(index,item);
  }
}