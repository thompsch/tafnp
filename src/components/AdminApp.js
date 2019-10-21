// React
import React, { useState } from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import AlertApp from "./AlertApp";
import { Button, Card, ListGroup, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { useStitchAuth } from "./StitchAuth";
import { getAppSettings, sendTextToAll } from "./../stitch/";
import AllUsersTable from "./AllUsersTable";

AdminApp.propTypes = {};

export default function AdminApp(u) {

  const [user, setUser] = useState((u && u._id) ? u : {});
  var [showSendText, setShowSendText] = useState(false);
  var [showChangeSettings, setShowChangeSettings] = useState(false);
  var [showAllUsers, setShowAllUsers] = useState(false);

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
            <h1>Welcome {user.name != null? user.name : 'WIWS Admininistrator!'}</h1>
          </Card.Title>
          <h3>You can do the following things from this page:</h3>
          <ListGroup>
              <ListGroup.Item><Button variant="info" onClick={()=>{hideAll();setShowSendText(true)}}>Send a Group Text</Button></ListGroup.Item>
              <ListGroup.Item><Button variant="info" onClick={()=>{hideAll();setShowAllUsers(true)}}>Manage Users</Button></ListGroup.Item>
              <ListGroup.Item><Button variant="info" onClick={()=>{hideAll();setShowChangeSettings(true)}}>Change my account settings</Button></ListGroup.Item>
              <ListGroup.Item><Button variant="light" onClick={()=>{hideAll();}}>Add an Admin</Button></ListGroup.Item>
              <ListGroup.Item><Button className="pull-right" variant="secondary" onClick={handleLogout}>Logout</Button></ListGroup.Item>
              </ListGroup>
        </Card>
        {showSendText && <Card>
            <InputGroup>
                <InputGroup.Prepend>Text Message</InputGroup.Prepend>
                <FormControl as="textarea" name="textBody" onChange={(e)=>setTextBody(e.target.value)}/>
            </InputGroup>
          <Button variant="secondary" onClick={()=>sendTheText()}>Send</Button>
        </Card>}
         {showChangeSettings && <Card id='changesettings'>
            <AlertApp/>
        </Card>}
        {showAllUsers && <Card id='showUsers'>
            <AllUsersTable />
        </Card>}
      </Layout>
    </ErrorBoundary>
  );

  function hideAll(){
    setShowAllUsers(false);
    setShowChangeSettings(false);
    setShowSendText(false);
  }

  function onChecked(index, checked){
      selectedAlerts[index].checked = checked;
      setSelectedAlerts(selectedAlerts);
  }
  
  function sendTheText(){
    //sendText(textBody, sendTo);
    sendTextToAll(textBody);
  }

}

const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  
  align-items: center;
`;
