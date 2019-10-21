import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { getCurrentStitchUser } from "../stitch";
import { updateUserAndSendText } from "./functions";
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
    if (result === null) { 
      //we have a new login
      console.log('Creating a new user!')
      return await appSettingsCollection.findOne().then(async appSettings=>{
          return await usersCollection.insertOne({
            oauth_id: csu.id, 
            name: csu.profile.data.name, 
            email: csu.profile.data.email,
            phone: ('(xxx)yyy-zzzz'),
            alerts: appSettings.alert_types,
            children: [{name:'', grade:''}] })
            .then(newUser=>{
              return newUser;
            })
        })
    } else { return result; }})
  .catch(gollygee=>{console.error(gollygee)});
}

export async function saveCurrentUser(user) {
  return await updateUserAndSendText(user)
  .then(result=>{
    console.log('updated user results', result);
    return true;
  }).catch(gollygee=>{
    console.error(gollygee);
    return false;
  });
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

export async function isPhoneUnique(phone){
  return await appSettingsCollection.findOne().then(settings=>{
    return !settings.phone_numbers.includes(phone);
  })
}

export async function getAppSettings(){
  return await appSettingsCollection.findOne().then(settings=>{
    return settings;
})}