import React, { useState } from "react";
import ErrorBoundary from "react-error-boundary";
import { getCurrentUser } from "./../stitch/";
import { useStitchAuth } from "./StitchAuth";
import { Card, Alert, InputGroup, FormControl, Button } from "react-bootstrap";
import validator from "validator";
import ConfirmNumberModal from "./ConfirmNumberModal";
import { GoAlert, GoCheck, GoX } from "react-icons/go";
import ReactToolTip from "react-tooltip";
import { parsePhoneNumberFromString } from 'libphonenumber-js';


AlertApp.propTypes = {};

export default function AlertApp(props) {

  const [phone, setPhone] = useState(props.phone);
  const {
      actions: { handleLogout },
   } = useStitchAuth();

  var [isLoading, setIsLoading] = useState(false);

  const isValidNumber = (phone && validator.isMobilePhone(phone, 'en-US'));
  var [showConfirm, setShowConfirm] = useState();
  var [confirmed, setConfirmed] = useState(user.confirmed);

  if (!user || (user._id === undefined)) {

    if (!isLoading) {
      setIsLoading(true);
      getCurrentUser(phone).then(fetchedUser => {
        setUser(fetchedUser);
        setIsLoading(false);
      });
    }

    return (
      <ErrorBoundary>
          <Card>
            <Card.Title>
              <h1>Loading...</h1>
            </Card.Title>
          </Card>
      </ErrorBoundary>
    )
  }
 
  return (
    <ErrorBoundary>
        <Card>
          <Card.Header>
            <h1>Your Settings and Preferences</h1>
          </Card.Header>
          </Card>
          <Card>
          {!confirmed && <Alert variant='warning'>
          Welcome! We need to verify your phone number before we can send you text messages. Please check the phone number and 
            click the "Verify" button.
          </Alert>}
         <InputGroup>
          <FormControl name="userphone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
            <InputGroup.Append>
                {!isValidNumber && <GoX color="red" size='30' data-for='novalid' data-tip="This is not a valid phone number." />}
                { (isValidNumber && confirmed) ? 
                <GoCheck color="green" size='30' data-for='good' data-tip="This is a confirmed phone number." /> : 
                <GoAlert color="gold" size='30' data-for='unconfirmed' data-tip="This number has not yet been confirmed." />}   
              </InputGroup.Append>
            </InputGroup>
            <Button onClick={()=>CheckNumber()}>Verify</Button>
            {!isValidNumber && <label style={{color:'red'}}>Please enter a valid phone number</label>}
          </Card>
          <ConfirmNumberModal close={()=>setShowConfirm(false)} show={showConfirm} phone={phone} id={user._id} confirmPhoneChanges={(e)=>confirmPhoneChanges(e)}></ConfirmNumberModal>
          <ReactToolTip id='novalid'/>
        <ReactToolTip id='good'/>
        <ReactToolTip id='unconfirmed'/>
        {confirmed && 
         <ErrorBoundary>
            <Alert variant='success'>Thank you. Your number has been confirmed and you will start receiving text messages from WIWS.</Alert>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
         </ErrorBoundary>
         }
   </ErrorBoundary>
  );

  function CheckNumber(){
   console.log('CheckNumber',phone)
   var formattedPhone = parsePhoneNumberFromString(phone, "US");
   console.log(formattedPhone)
   if (formattedPhone===undefined || !validator.isMobilePhone(formattedPhone.number, 'en-US')) return;
   
   //setPhone(formattedPhone.format("E.164"));
   else {
      setShowConfirm(true);
      ReactToolTip.rebuild();
   }
 }

 function confirmPhoneChanges(success){
   if (success) { 
      setConfirmed(true);
      
   }
   else {
     //setPhone(originalPhoneNumber);
     setConfirmed(user.confirmed)
 }
 }

}

