// React
import React, { useState } from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import ChildList from "./ChildList";
import AlertList from "./AlertList";
import User from "./User";
import { getCurrentUser,saveCurrentUser } from "./../stitch/"
import { Card, CardTitle, Button, Input } from "reactstrap";

AlertApp.propTypes = {};

export default function AlertApp() {

  const [user, setUser] = useState(user && user._id ? user : {});

  if (user == undefined || user._id === undefined) {
    getCurrentUser().then(fetchedUser => {
      setUser(fetchedUser);
    });

    return (
      <ErrorBoundary>
        <Layout>
          <AlertCard>
            <Title>
              <h1>Loading...</h1>
            </Title>
          </AlertCard>
        </Layout>
      </ErrorBoundary>
    )
  } 
 
  return (
    <ErrorBoundary>
      <Layout>
        <AlertCard>
          <Title>
            <h1>Your Settings and Preferences</h1>
          </Title>

          <User updateUser={(u)=>updateUser(u)} user={user}/>
 
          <h3>Child(ren)</h3>
          <ChildList updateUser={(u)=>updateUser(u)} {...user} />
          <h3>Your Alert Preferences</h3>
          <AlertList updateUser={(u)=>updateUser(u)} {...user} />
        </AlertCard>
        <Button onClick={()=>saveUser()}>Save My Changes</Button>
      </Layout>
    </ErrorBoundary>
  );
  
  function updateUser(u){
    console.log('a',u.name)
    setUser(user);
    console.log('b',user.name)
  }

  function saveUser(){
    saveCurrentUser(user);
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
const AlertCard = styled(Card)`
  max-width: 600px;
  align-items: center;
  width: 100%;
`;
const Title = styled(CardTitle)`
  margin: 0;
  h1 {
    padding: 20px;
    margin: 0;
  }
`;

// <User updateUser={()=>onChangedField(user)} user={user}/>

/*
  <Input name="username" value={name} onChange={(e)=>{user.name=(e.target.value);setName(user.name);setUser(user);}}/>
            <Input name="useremail" value={user.email} onChange={()=>setUser(user)} />
            <Input name="userphone" value={user.phone} onChange={()=>setUser(user)}/>
            
            */