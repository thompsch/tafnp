import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import {getCurrentStitchUser} from "../stitch";
import { app } from "./app";

const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "atlas"
);

const usersCollection = mongoClient.db("alerts").collection("users");
const appSettingsCollection = mongoClient.db("alerts").collection("appSettings");

export { usersCollection };

export async function getCurrentUser() {
  const csu = getCurrentStitchUser();
  return await usersCollection.findOne({oauth_id:csu.id})
  .then(async result=>{
    if (result === null) { //we have a new login
      console.log('Creating a new user!')
     return await appSettingsCollection.findOne().then(async appSettings=>{
        return await usersCollection.insertOne({
          oauth_id: csu.id, 
          name: csu.profile.data.name, 
          email: csu.profile.data.email,
          phone: '(xxx)yyy-zzzz',
          alerts: appSettings.alert_types,
          children: [{name:'', grade:''}] })
          .then(newUser=>{
            return newUser;
          })
      })
    } else {
      console.log('existing user found.')
      return result}})
  .catch(gollygee=>{console.error(gollygee)});
}

export async function saveCurrentUser(user) {
  return await usersCollection.findOneAndReplace({_id: user._id}, user, {upsert:true})
  .then(result=>{
    return true}
  ).catch(gollygee=>{
    console.error(gollygee);
    return false;}
  );
}

export async function isAdmin(){
  const csu= await getCurrentStitchUser();
    if (!csu) return false;
    return await usersCollection.findOne({oauth_id:csu.id})
    .then(async user=>{
      if (!user || !user._id) return false;
      return await appSettingsCollection.findOne().then(settings=>{
          return {isAdmin:settings.admins.includes(user._id.toString()), user:user};
      }).catch(gollygee=>{
        console.error(gollygee);
        return false;}
      );
    }).catch(gollygee=>{
      console.error(gollygee);
      return false;}
    );
}

export async function getAppSettings(){
  return await appSettingsCollection.findOne().then(settings=>{
    return settings;
})}