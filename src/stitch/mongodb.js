import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "atlas"
);

const usersCollection = mongoClient.db("alerts").collection("users");

export { usersCollection };

export async function getCurrentUser() {
  console.log('Fetching current user aysnc, yo')
  // Return the user object of the currently logged in user
  return await usersCollection.findOne({})
  .then(result=>{
    console.log('I HAZ A USER', result.user)
    return result.user})
    .catch(ohshit=>{console.error(ohshit)});
}