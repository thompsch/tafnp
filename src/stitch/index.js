import { app } from "./app";
import { usersCollection, getCurrentUser, saveCurrentUser } from "./mongodb";
import {
  loginAnonymous,
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentStitchUser,
} from "./authentication";

export { app, usersCollection };
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentStitchUser, getCurrentUser,saveCurrentUser };
