// React
import React, {useState} from "react";
import styled from "@emotion/styled";
// Components & Hooks
import AlertApp from "./AlertApp";
import AdminApp from "./AdminApp";
import Login from "./Login";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { isAdmin } from "./../stitch/";
import { Container, Button, Nav, Navbar, NavItem } from "react-bootstrap"; 

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
      <Navbar bg="info" variant="light">
        <Nav>
    <Navbar.Brand href="wiws.org">
      <img
        alt="WIWS Logo"
        src="/logo.jpg"
        className="d-inline-block align-top" />
     
      
</Navbar.Brand>

      </Nav>
      <Nav className="ml-auto">
      <Navbar.Text><h1>WIWS Text Alert System</h1></Navbar.Text>
      </Nav>
      <Nav className="ml-auto">
        
      <NavItem>{isLoggedIn && <Button className='pull-right' variant="secondary" onClick={handleLogout}>Logout</Button>}</NavItem>
      </Nav>
    
  </Navbar>
       <NextScreen/>
    </Container>
  );
}

