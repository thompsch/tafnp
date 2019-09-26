import { app } from "./app.js";

export function confirmSms(phoneNumber) {
  app.callFunction("sendConfirmationSms", [phoneNumber]);
}