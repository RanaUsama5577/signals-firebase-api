import {db} from "../config.js"
import * as utils from "../utils/index.js"

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
  var timestamp = utils.GetTimestamp();
  content.messageTimestamp = new Date();
  var checkDoc = await db.collection("adminChat").doc(user.userId).get()
  if(!checkDoc.exists){
    await db.collection("adminChat").doc(user.userId).set({
      creationTime:new Date(),
      lastUpdateTime:new Date(),
      participantsDetails:[user.userId,"admin"],
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
    await db.collection("adminChat").doc(user.userId).update({
      lastUpdateTime:new Date(),
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
  return await db.collection("adminChat").doc(user.userId).collection("dialog").doc(timestamp).set(content)
    .then(function(){
      console.log("message added");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
}
  