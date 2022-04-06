import {db,messaging} from "../config.js"
import * as utils from "../utils/index.js"
import {GetUserFromId} from "../db/users.js"

export const getAdminMessagingFromDb = async (limit,lastDocId,userId,AdminId) => {
  console.log("userId",userId,"AdminId",AdminId)
  var list = db.collection("adminChat").doc(userId).collection("dialogs").doc(AdminId).collection("messages")
  if(lastDocId != ""){
    var lastDoc = await db.collection("adminChat").doc(userId).collection("dialogs").collection("messages").doc(lastDocId).get()
    if(lastDoc.exists){
      list  = list.startAfter(lastDoc)
    }
  }
  list = await list.limit(limit).get()
  var data = []
  list.forEach(function(doc){
      data.push(doc.data())
  })
  return data
}

export const CreateMessagesInDb = async (content,user) => {
  var Id = "";
  var AdminId = "";
  var secondUser = await GetUserFromId(content.receivedUserId)
  content.messageTimestamp = new Date();
  var users = [user.userId,content.receivedUserId];
  console.log("users",users)
  var checkDoc = await db.collection("adminChat").where("participantsDetails","array-contains",users).limit(1).get()
  
  if(checkDoc.size == 0){
    if(user.isAdmin == undefined || user.isAdmin == false){
      Id = user.userId
      AdminId = secondUser.userId
    }
    else{
      Id = secondUser.userId
      AdminId = user.userId
    }
    await db.collection("adminChat").doc(Id).set({
      creationTime:new Date(),
      lastUpdateTime:new Date(),
      participantsDetails:users,
      lastMessageTime:new Date(),
    })
    .then(function(){
      console.log("Chat Room created");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
  }
  else{
    checkDoc.forEach(function(doc){
      Id = doc.id;
    })
    await db.collection("adminChat").doc(Id).update({
      lastUpdateTime:new Date(),
      lastMessageTime:new Date(),
    })
    .then(function(){
      console.log("Chat Room updated");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
  }
  var timestamp = utils.GetTimestamp();
  await db.collection("adminChat").doc(Id).collection("dialogs").doc(AdminId).set({
    lastUpdateTime:new Date(),
  })
  .then(function(){
    console.log("Messages updated");
    return 1;
  })
  .catch(function(error){
    console.log("error",error.message);
    throw new Error(error.message)
  })
  await db.collection("adminChat").doc(Id).collection("dialogs").doc(AdminId).collection("messages").doc(timestamp).set(content)
    .then(function(){
      console.log("message added");
      const message = {
        notification:{
          title: 'New message',
          body: content.message
        },
        data: {
          title: 'New message',
          body: content.message
        },
        token: secondUser.fcmToken
      };
      return messaging.send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(error.message)
    })
}
  