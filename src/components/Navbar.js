import React from "react";
import styled from "@emotion/styled";
import {app, logoutUser } from "./../stitch";
import { Button } from "react-bootstrap";

const NavbarContainer = styled.div`
  height: 60px;
  padding: 10px 20px;
  line-height: 40px;
  display: flex;
  flex-direction: row-reverse;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Button variant="secondary" onClick={() => onLogout() }>Log Out</Button>
    </NavbarContainer>
  );
}

export default Navbar;

function onLogout() {
  logoutUser(app.auth.user).then(() =>{ window.location.reload() });
}
