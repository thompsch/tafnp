import React, {useState} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { CheckedIcon, UncheckedIcon } from "./Icon";
import { Card, CardBody } from "reactstrap";

AlertItem.propTypes = {
  item: PropTypes.object,
  toggleStatus: PropTypes.func,
};

export default function AlertItem(props) {

  const {item, index, toggleStatus} = props;

  const [check, setCheck] = useState(item.subscribed)

  const Checkbox = item.subscribed ? CheckedIcon : UncheckedIcon;
  return (
    <Todo onClick={()=>changeState(index, item)}>
      <Layout>
        <Checkbox />
        <Text>{item.type}</Text>
      </Layout>
    </Todo>
  );

  function changeState(index, item){
    setCheck(!item.subscribed);
    toggleStatus(index,item);
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
