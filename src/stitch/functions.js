import { app } from "./app.js";

export function confirmSms(phoneNumber) {
  app.callFunction("sendConfirmationSms", [phoneNumber]);
}

export async function checkCode(userId, phoneNumber, code) {
  return await app.callFunction("confirmSecret", [userId.toString(), phoneNumber, code]).then(response=>{
    console.log('function response', JSON.stringify(response))
      if (response.status === "success") return true;
      else {
        console.error(response.message);
        return false;
    }
  })
}

export async function sendText(message, groups) {
  return await app.callFunction("SendSmsByCategories", [{'msg': message, 'to': groups}]).then(response=>{
      if (response && response.status === "success") return true;
      else {
        return false;
    }
  });
}

export async function softDeleteUser(user) {
  return await app.callFunction("softDeleteUser", [user]).then(response=>{
    return response;
  });
}