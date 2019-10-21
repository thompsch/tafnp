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

export default function AlertApp(props) {
  const [user, setUser] = useState((user && user._id) ? user : {});
  var [isLoading, setIsLoading] = useState(false);

  if (!user || user._id === undefined) {

    if (!isLoading) {
      setIsLoading(true);
      getCurrentUser().then(fetchedUser => {
        setUser(fetchedUser);
        setIsLoading(false);
      });
    }

    return (
      <ErrorBoundary>
          <Card>
            <Card.Title>
              <h1>Loading...</h1>
            </Card.Title>
          </Card>
      </ErrorBoundary>
    )
  }
 
  return (
    <ErrorBoundary>
        <Card>
          <Card.Header>
            <h1>Your Settings and Preferences</h1>
          </Card.Header>
          <Card>
          {!validator.isMobilePhone(user.phone, 'en-US') && <Alert variant='warning'>It looks like you're new here! Please provide a phone number and 
            specify what types of alerts you'd like to receive.
          </Alert>}
          </Card>
          <User updateUser={(u)=>updateUser(u)} user={user}/>
          <Card>
           <Card.Header>Your Alert Preferences</Card.Header>
          <AlertList updateUser={(u)=>updateUser(u)} {...user} />
          </Card>
          <SavedModal saveUser={saveUser}></SavedModal>
        </Card>
    </ErrorBoundary>
  );
  
  function updateUser(u){
    setUser(user);
  }

  async function saveUser() {
    return await saveCurrentUser(user);
  }
}

