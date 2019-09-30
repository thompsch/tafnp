// React
import React, { useState } from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import validator from "validator";
import ChildList from "./ChildList";
import AlertList from "./AlertList";
import User from "./User";
import SavedModal from "./SavedModal";
import { getCurrentUser, saveCurrentUser } from "./../stitch/"
import { Card, Alert } from "react-bootstrap";

AlertApp.propTypes = {};

export default function AlertApp() {

  const [user, setUser] = useState((user && user._id) ? user : {});
  var [showConfirmation, setShowConfirmation] = useState(false);
  var [isLoading, setIsLoading] = useState(false);

  if (!user || user._id === undefined) {

    if (!isLoading) {
      setIsLoading(true);
      getCurrentUser().then(fetchedUser => {
        setUser(fetchedUser);
      });
    }

    return (
      <ErrorBoundary>
        <Layout>
          <Card>
            <Card.Title>
              <h1>Loading...</h1>
            </Card.Title>
          </Card>
        </Layout>
      </ErrorBoundary>
    )
  }
 
  return (
    <ErrorBoundary>
      <Layout>
        <Card>
          <Card.Title>
            <h1>Your Settings and Preferences</h1>
          </Card.Title>
          <Card>
          {!validator.isMobilePhone(user.phone, 'en-US') &&<Alert>It looks like you're new here! Please provide a phone number, information about your child(ren), and 
            specify what types of alerts you'd like to receive.
          </Alert>}
          </Card>
          <User updateUser={(u)=>updateUser(u)} user={user}/>
           <h3>Child(ren)</h3>
          <ChildList updateUser={(u)=>updateUser(u)} {...user} />
          <h3>Your Alert Preferences</h3>
          <AlertList updateUser={(u)=>updateUser(u)} {...user} />
          <SavedModal saveUser={saveUser}></SavedModal>
        </Card>
      </Layout>
    </ErrorBoundary>
  );
  
  function updateUser(u){
    setUser(user);
  }

  async function saveUser() {
    return await saveCurrentUser(user);
    //console.log(result)
    //setShowConfirmation(true);
  }
}
const Layout = styled.div`
  background: #eeeeee;
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
