// React
import React, { useState } from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
// To-Do Components & Hooks
import ChildList from "./ChildList";
import AlertList from "./AlertList";
import AlertControls from "./AlertControls";
import {getCurrentUser} from "./../stitch/"
import { Card, CardTitle } from "reactstrap";

AlertApp.propTypes = {};
export default function AlertApp() {

  const [user, setUser] = useState(user && user._id ? user : {});
 
  if (user == undefined || user._id === undefined) {
    getCurrentUser().then(foo=>{
      setUser(foo)
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
          name, email, etc. here
          <h3>Chil(ren)</h3>
          <ChildList {...user} />
          <h3>Your Alert Preferences</h3>
          <AlertControls {...user} />
          <AlertList {...user} />
        </AlertCard>
      </Layout>
    </ErrorBoundary>
  );
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