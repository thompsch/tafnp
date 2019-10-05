import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import { useStitchAuth} from "./StitchAuth";
import { Container, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa"

Login.propTypes = {};
export default function Login() {
  const { actions } = useStitchAuth();
  return (
    <ErrorBoundary>
      <Container>
      <div className="text-center" color='#425060'>
      <h2 >Welcome!</h2>
      <b>Please sign in using a Google or Facebook account.</b> 
      <br/>
      <br/>
      
    <ButtonGroup size='lg'>
        <Button variant='outline-primary' onClick={() => actions.handleLogin("google")}>
          <FaGoogle color='#003399' size='30px'/>  Log In with Google</Button>
        &nbsp;
        <Button variant='outline-primary' onClick={() => actions.handleLogin("facebook")}>
          <FaFacebookSquare color='#003399' size='30px'/>  Log In with Facebook</Button>
      </ButtonGroup>
      </div>

     
      </Container>
    </ErrorBoundary>
  );
}
