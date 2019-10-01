import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputGroup } from "react-bootstrap";
import { isArray } from "util";

AlertTypesList.propTypes = {
  alerts: PropTypes.array,
  onChecked: PropTypes.func
};

export default function AlertTypesList(props) {
   const [alerts, setAlerts] = useState(props.alerts);
   const onChecked = props.onChecked;

    if (alerts) {
        return (alerts.map((item, index) => (
            <InputGroup key={index}>
                <InputGroup.Prepend>
                <InputGroup.Checkbox name={"chk" + index} onChange={(e)=>checkit(e)}/>
                </InputGroup.Prepend>{item.alert}
            </InputGroup>))
        );
    } else return <p>Loading Alert categories...</p>;

    function checkit(e){
        const t = e.target;
        var index = t.name.substring(3);
        alerts[index].checked = t.checked;
        setAlerts(alerts);
        onChecked(index,t.checked);
    }
}