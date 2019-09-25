import { app } from "./app";
import { usersCollection, getCurrentUser } from "./mongodb";
import {
  loginAnonymous,
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentStitchUser,
} from "./authentication";

export { app, usersCollection };
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentStitchUser, getCurrentUser };
