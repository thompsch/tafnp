import React, { useState }  from "react";
import { PropTypes } from 'prop-types';
import ErrorBoundary from "react-error-boundary";
import { useStitchAuth} from "./StitchAuth";
import { isPhoneUnique } from "./../stitch/";
import { Container, Button,ButtonGroup, InputGroup, FormControl } from "react-bootstrap";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa"
import validator from "validator";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { GoX } from "react-icons/go";

Login.propTypes = {
  setPhone: PropTypes.func,
  setConfirmed: PropTypes.func,
  setIsUnique: PropTypes.func
};

export default function Login(props) {
  const { actions } = useStitchAuth();
  console.log(actions)
  var phoneInput;
  var { setPhone, setIsUnique, setConfirmed } = props
  const [isValid, setIsValid] = useState(true);

  return (
    <ErrorBoundary>
      <Container>
      <div className="text-center" color='#425060'>
      <h2 >Welcome to the WIWS Alert System!</h2>
      <p>
      <b>Please enter your phone number and press "Go!", </b><br/>
      <b>or log on with your Google or Facebook account.</b> 
      </p>
      <InputGroup>
            <InputGroup.Prepend>Phone number: </InputGroup.Prepend>
            <FormControl ref={(ref) => {phoneInput = ref}} name="phone" />
            <Button target="phone" variant='outline-primary' onClick={() => checkNumberAndLogin()}>Go!</Button>
            {!isValid && <InputGroup>
            <GoX color="red" size='30' data-for='novalid' data-tip="This is not a valid phone number." />
            <p>Please enter a valid phone number</p>
            </InputGroup>}
      </InputGroup>
      <br/><br/>
      <ButtonGroup size='lg'>
        <Button variant='outline-primary' onClick={() => actions.handleLogin("google")}>
          <FaGoogle color='#003399' size='30px'/>Log In with Google</Button>
        &nbsp;
        <Button variant='outline-primary' onClick={() => actions.handleLogin("facebook")}>
          <FaFacebookSquare color='#003399' size='30px'/>Log In with Facebook</Button>
      </ButtonGroup>

     </div>
      </Container>
    </ErrorBoundary>
  );
  
  async function checkNumberAndLogin(){
    console.log('my # is', phoneInput.value)
    var formattedPhone = parsePhoneNumberFromString(phoneInput.value, "US");
    if (formattedPhone===undefined) {
      setIsValid(false);
      return;
    }
    var phone = formattedPhone.format("E.164");
    if (!validator.isMobilePhone(phone, 'en-US')){
      setIsValid(false);
      return;
    }
    else {
      await actions.handleLogin("anonymous").then(async ()=>{
        await isPhoneUnique(phone).then(unique=>{
          console.log('unique', unique)
          setIsUnique(unique);
          if (!unique) setConfirmed(true);
          setIsValid(true);
          setPhone(phone);
        });
      });
    }
  }
}
