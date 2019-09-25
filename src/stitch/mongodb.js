import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "atlas"
);

const usersCollection = mongoClient.db("alerts").collection("users");

export { usersCollection };

export async function getCurrentUser() {
  // Return the user object of the currently logged in user
  return await usersCollection.findOne({})
  .then(result=>{
    return result.user})
    .catch(ohshit=>{console.error(ohshit)});
}

export async function saveCurrentUser(user) {
  console.log("I'm going to replace the existing user with this new info", user)
  return await usersCollection.findOneAndReplace({_id: user._id}, user, {upsert:true})
  .then(result=>{
    return result.user})
    .catch(ohshit=>{console.error(ohshit)});
}