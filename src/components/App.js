// React
import React from "react";
import styled from "@emotion/styled";
// Components & Hooks
import AlertApp from "./AlertApp";
import Login from "./Login";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { Button } from "react-bootstrap"; 

App.propTypes = {};
export default function App() {
  return (
    <StitchAuthProvider>
      <AppUI />
    </StitchAuthProvider>
  );
}

AppUI.propTypes = {};
function AppUI() {
  const {
    isLoggedIn,
    currentStitchUser,
    actions: { handleLogout },
  } = useStitchAuth();
  return (
    <Layout>
      <Navbar>
        {isLoggedIn && <Button variant="secondary" onClick={handleLogout}>Logout</Button>}
        <AppTitle>Text Alerts</AppTitle>
      </Navbar>
      {isLoggedIn ? <AlertApp /> : <Login />}
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  * {
    font-family: sans-serif;
  }
`;
const Navbar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  height: 62px;
  padding: 10px;
  background: #5e9668;
`;
const AppTitle = styled.h1`
  margin-right: auto;
`;
