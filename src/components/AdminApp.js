// React
import React, { useState } from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertApp from "./AlertApp";
import { Button, Card, ListGroup, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useStitchAuth } from "./StitchAuth";
import  AlertTypesList  from "./AlertTypesList";
import { getAppSettings, app, sendText } from "./../stitch/";


AdminApp.propTypes = {};

export default function AdminApp() {


  const [user, setUser] = useState((user && user._id) ? user : {});
  var [showSendText, setShowSendText] = useState(false);
  var [showChangeSettings, setShowChangeSettings] = useState(false);
    const [textBody, setTextBody] = useState();
    const [textCategory, setTextCategory] = useState();

    const [appSettings, setAppSettings] = useState();
    const [selectedAlerts, setSelectedAlerts] = useState([]);

    getAppSettings().then(settings=> {
        if (settings && !appSettings) {
            setAppSettings(settings);
        } else if(appSettings && selectedAlerts.length == 0){
            var alerts = [];
            appSettings.alert_types.map((item, index) => (
                alerts.push({alert:item.type, checked:false})));
            
            setSelectedAlerts(alerts);
            console.log('setSelectedAlerts', setSelectedAlerts)
        }
    })

  const {
    actions: { handleLogout },
  } = useStitchAuth();

  return (
    <ErrorBoundary>
      <Layout>
        <Card>
          <Card.Title>
            <h1>Welcome WIWS Admin</h1>
          </Card.Title>
          <h3>You can do the following things from this page:</h3>
          <ListGroup>
              <ListGroup.Item><Button variant="secondary" onClick={()=>{setShowSendText(true)}}>Send a Group Text</Button></ListGroup.Item>
              <ListGroup.Item>Send a Text to an Individual</ListGroup.Item>
              <ListGroup.Item><Button variant="secondary" onClick={()=>{setShowChangeSettings(true)}}>Change my personal alert settings</Button></ListGroup.Item>
              <ListGroup.Item><Button variant="secondary" onClick={handleLogout}>Logout</Button></ListGroup.Item>
              </ListGroup>
        </Card>
        {showSendText && <Card>
            <InputGroup>
                <InputGroup.Prepend>Text Message</InputGroup.Prepend>
                <FormControl as="textarea" name="textBody" onChange={(e)=>setTextBody(e.target.value)}/>
                
            </InputGroup>
          <ListGroup>
             <AlertTypesList onChecked={(a,b)=>onChecked(a,b)} alerts={selectedAlerts} />
          </ListGroup>
          <Button variant="secondary" onClick={()=>sendTheText()}>Send</Button>
        </Card>}
         {showChangeSettings && <Card id='changesettings'>
            <AlertApp/>
        </Card>}
      </Layout>
    </ErrorBoundary>
  );

  function onChecked(index, checked){
      if (index) console.log('AA', index, checked);
      selectedAlerts[index].checked = checked;
      setSelectedAlerts(selectedAlerts);
      console.log('AA', selectedAlerts);
  }
  
  function sendTheText(){
    var sendTo = [];
    selectedAlerts.forEach(a=>{
        if (a.checked) sendTo.push(a.alert);
    })

    console.log(textBody, "will be sent to", sendTo);
    sendText(textBody, sendTo);
  }

}

const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  
  align-items: center;
`;
