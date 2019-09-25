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