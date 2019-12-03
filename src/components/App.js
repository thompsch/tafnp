import React, {useState} from "react";
import AlertApp from "./AlertApp";
import AdminApp from "./AdminApp";
import Login from "./Login";
import { StitchAuthProvider, useStitchAuth } from "./StitchAuth";
import { isAdmin, addPhone, isPhoneUnique } from "./../stitch/";
import ErrorBoundary from "react-error-boundary";
import { Card, Alert, InputGroup, FormControl, Container, Button, Nav, Navbar, NavItem } from "react-bootstrap";
import validator from "validator";
import ConfirmNumberModal from "./ConfirmNumberModal";
import { GoAlert, GoCheck, GoX } from "react-icons/go";
import ReactToolTip from "react-tooltip";
import { parsePhoneNumberFromString } from 'libphonenumber-js';


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
const [phone, setPhone] = useState();
const [showConfirm, setShowConfirm] = useState();
const [confirmed, setConfirmed] = useState(false);
const [isUnique, setIsUnique] = useState(true);
const isValidNumber = (phone && validator.isMobilePhone(phone, 'en-US'));
const [originalPhoneNumber, setOPN] = useState();
  if (phone && (originalPhoneNumber===undefined)) {
    setOPN(phone);
  }

console.log('phone & orig?', phone, originalPhoneNumber)
if (user && phone) {
  user.phone = phone;
}

if (admin === undefined){
  isAdmin().then(result=>{
    setAdmin(result.isAdmin);
    setUser(result.user);
  });
}

 const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth();
  
function NextScreen(){
  console.log("phone, unique, confirmed", phone, isUnique, confirmed)
    if (phone !== originalPhoneNumber){
      setIsUnique(true);
      setConfirmed(false);
    }
    {
      if (phone) {
            return <ErrorBoundary>
              <Card>
            {(isUnique && !confirmed) && <Alert variant='warning'>
            Welcome! We need to verify your phone number before we can send you text messages. Please check the phone number and 
              click the Verify button.
            </Alert>}
          <InputGroup>
            <FormControl name="userphone" value={phone} onChange={(e)=>{phoneChanged(e)}}/>
              <InputGroup.Append>
                  {!isValidNumber && <GoX color="red" size='30' data-for='novalid' data-tip="This is not a valid phone number." />}
                  { (isValidNumber && confirmed) ? 
                  <GoCheck color="green" size='30' data-for='good' data-tip="This is a confirmed phone number." /> : 
                  <GoAlert color="gold" size='30' data-for='unconfirmed' data-tip="This number has not yet been confirmed." />}   
                </InputGroup.Append>
              </InputGroup>
              <Button onClick={()=>CheckNumber()} disabled={confirmed}>Verify</Button>
              {!isValidNumber && <label style={{color:'red'}}>Please enter a valid phone number</label>}
            </Card>
            <ConfirmNumberModal close={()=>setShowConfirm(false)} show={showConfirm} phone={phone} confirmPhoneChanges={(e)=>confirmPhoneChanges(e)}></ConfirmNumberModal>
            <ReactToolTip id='novalid'/>
          <ReactToolTip id='good'/>
          <ReactToolTip id='unconfirmed'/>
          {(isUnique && confirmed) && 
          <ErrorBoundary>
              <Alert variant='success'>Thank you. Your number has been confirmed and you will start receiving text messages from WIWS.</Alert>
              <Button variant="secondary" onClick={LogMeOut}>Logout</Button>
          </ErrorBoundary>
          }
          {!isUnique && 
          <ErrorBoundary>
              <Alert variant='success'>This phone number is already confirmed in the system and should be receiving texts from WIWS.</Alert>
              <Button variant="secondary" onClick={LogMeOut}>OK</Button>
          </ErrorBoundary>
          }
        </ErrorBoundary>   
      }
      else if (isLoggedIn && admin) {return <AdminApp {...user} />}
      else {return <Login setPhone={(p)=>setPhone(p)} setIsUnique={(p)=>setIsUnique(p)} setConfirmed={(c)=>{setConfirmed(c)}} user={user} />}
    }
  }

  return (
    <Container>
      <Navbar bg="info" variant="light">
        <Nav>
          <Navbar.Brand href="http://wiws.org" target="_blank">
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
            <NavItem>{isLoggedIn && <Button className='pull-right' variant="secondary" onClick={LogMeOut}>Logout</Button>}</NavItem>
          </Nav>
      </Navbar>
      <NextScreen/>
      <hr/>
      <Alert variant='info'>
        <Card>
        <Card.Body>
          <Card.Title>Privacy Notice</Card.Title>
          <Card.Text>
          By providing your phone number, you agree to let WIWS administrative staff send you text messages regarding the school. You can unsubscribe any time by replying “STOP” to the phone number you receive the texts from.
          We store your phone number on secure servers, and do not associate the number with any personally-identifiable information.
          </Card.Text>
        </Card.Body>
            </Card>
            </Alert>
    </Container>
  );

  function LogMeOut() {
    setPhone(null);
    setAdmin(false);
    setIsUnique(true);
    setConfirmed(false);
  }

  function phoneChanged(e){
    setPhone(e.target.value);
    console.log('phonechanged', phone, originalPhoneNumber)
    

  }
  function CheckNumber(){
    console.log('CheckNumber',phone)
    var formattedPhone = parsePhoneNumberFromString(phone, "US");
    console.log(formattedPhone)
    if (formattedPhone===undefined || !validator.isMobilePhone(formattedPhone.number, 'en-US')) return;
    
    else {
      if (!isPhoneUnique(phone)) {
        setIsUnique(false);
        return;
      } else {
        setIsUnique(true);
          
            setShowConfirm(true);
          
        ReactToolTip.rebuild();
      }
    }
  }
 
  function confirmPhoneChanges(success){
    console.log('succ', success)
    if (success) { 
      console.log('success confirming phone', phone)
       setConfirmed(true);
       addPhone(phone.toString())
    }
      else {
        setConfirmed(user.confirmed)
    }
  }

}

