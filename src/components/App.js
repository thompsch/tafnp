// React
import React, {useState} from "react";
import styled from "@emotion/styled";
// Components & Hooks
import AlertApp from "./AlertApp";
import AdminApp from "./AdminApp";
import Login from "./Login";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { isAdmin } from "./../stitch/";
import { Container, Button } from "react-bootstrap"; 

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

const [user, setUser] = useState();
const [admin, setAdmin] = useState();
if (admin === undefined){
  isAdmin().then(result=>{
    setAdmin(result.isAdmin);
    setUser(result.user);
  });
}

 const {
    isLoggedIn,
    currentStitchUser,
    actions: { handleLogout },
  } = useStitchAuth();
  
function NextScreen(){
    {
      if (!isLoggedIn) {return <Login />}
      else if (isLoggedIn && !admin) {return <AlertApp />}
      else if (isLoggedIn && admin) {return <AdminApp {...user} />}
    }
  }

  return (
    <Container>
      <Navbar>
        {isLoggedIn && <Button variant="info" onClick={handleLogout}>Logout</Button>}
        <AppTitle>WIWS Text Alerts</AppTitle>
      </Navbar>
      <NextScreen/>
    </Container>
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
