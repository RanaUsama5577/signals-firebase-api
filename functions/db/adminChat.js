import {db} from "../config.js"
import * as utils from "../utils/index.js"
import {GetUserFromId} from "../db/users.js"

export const getAdminMessagingFromDb = async (limit,lastDocId,user) => {
  var list = db.collection("adminChat").doc(user.userId).collection("dialog")
  if(lastDocId != ""){
    var lastDoc = await db.collection("adminChat").doc(user.userId).collection("dialog").get()
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
  var Id = utils.GetTimestamp();
  content.messageTimestamp = new Date();
  var users = [user.userId,user.receivedUserId];
  var checkDoc = await db.collection("adminChat").where("participantsDetails","array-contains",users).limit(1).get()
  if(checkDoc.size == 0){
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
  await db.collection("adminChat").doc(Id).collection("dialog").doc(timestamp).set(content)
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
        to: content.receivedUserId
      };
      return messaging.send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
}
  