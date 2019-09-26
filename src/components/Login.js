import React from "react";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import { useStitchAuth} from "./StitchAuth";
import { Card, Button } from "react-bootstrap";

Login.propTypes = {};
export default function Login() {
  const { actions } = useStitchAuth();
  return (
    <ErrorBoundary>
      <Layout>
        <LoginCard>
          <Card.Body>
            <ButtonRow>
              <LoginButton onClick={() => actions.handleLogin("google")}> 
                Log In with Google
              </LoginButton>
              <LoginButton onClick={() => actions.handleLogin("facebook")}>
                Log In with Facebook
              </LoginButton>
            </ButtonRow>
          </Card.Body>
        </LoginCard>
      </Layout>
    </ErrorBoundary>
  );
}
const Layout = styled.div`
  background: #eeeeee;
  height: 100%;
  padding: 20px;
`;
const LoginCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
`;
const LoginButton = styled(Button)`
  margin-top: 10px;
  :first-of-type {
    margin-top: 0px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
`;
