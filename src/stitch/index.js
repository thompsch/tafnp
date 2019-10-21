import { app } from "./app";
import { usersCollection, getCurrentUser, saveCurrentUser, 
  isAdmin, getAppSettings, isPhoneUnique } from "./mongodb";
import {
  loginAnonymous,
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentStitchUser
} from "./authentication";
import { confirmSms, checkCode, sendText, sendTextToAll, softDeleteUser,addPhone } from "./functions"

export { app, usersCollection, loginAnonymous, logoutCurrentUser, hasLoggedInUser,
   getCurrentStitchUser, getCurrentUser, saveCurrentUser, isAdmin, getAppSettings, 
   isPhoneUnique , confirmSms, checkCode, sendText, sendTextToAll, softDeleteUser, addPhone };
