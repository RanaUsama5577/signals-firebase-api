import { MessagesWithAdmin,CreateMessages } from '../services/adminChat.js'
import { validationResult  } from 'express-validator';
import {GetUserFromId} from "../db/users.js"
import {auth} from "../config.js"

export const getChatMessagesWithAdminList = async (req, res, next) => {
  const content = req.query
  console.log("content",content)
  var user = ""
  //Get User
  const authorization = req.header('Authorization')??""
  await auth.verifyIdToken(authorization)
  .then(async(decodedToken) => {
    const uid = decodedToken.uid;
    user = await GetUserFromId(uid)
    if(user == null){
      var data = {
         error: "User not found",
         status: false,
       }
       res.status(401).send(data)
    }
  })
  .catch((error) => {
   var data = {
      error: error.message,
      status: false,
    }
    res.status(401).send(data)
  });
  //Get Chats
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
    { 
      errors: errors.array(),
      status:false,
    });
  }   
  var limit = parseInt(content.limit??20)
  var DocId = content.lastDocId??""
  var userId = user.userId??""
  var AdminId = content.AdminId??""
  try {
    var response = await MessagesWithAdmin(limit,DocId,userId,AdminId)
    var data = {
      status:true,
      data:response,
    }
    res.status(200).send(data)
  } catch(e) {
    var data = {
      error: e.message,
      status: false,
    }
    res.status(500).send(data)
  }
}

export const postChatMessage = async(req,res,next)=>{
  const content = req.body
  var user = ""
  var secondUser = ""
  const authorization = req.header('Authorization')??""
  await auth.verifyIdToken(authorization)
  .then(async(decodedToken) => {
    const uid = decodedToken.uid;
    user = await GetUserFromId(uid)
    secondUser = await GetUserFromId(content.receivedUserId)
    if(user == null){
      var data = {
         error: "User not found",
         status: false,
      }
      res.status(401).send(data)
    }
    else if(user.userId != content.creatorUserId){
      var data = {
        error: "Login user id should be equal to param creatorUserId",
        status: false,
      }
      res.status(401).send(data)
    }
    else if(user.userId ==  secondUser.userId){
      var data = {
        error: "You can't with yourself",
        status: false,
      }
      res.status(401).send(data)
    }
    else if(secondUser.isAdmin == false && user.isAdmin == false){
      var data = {
        error: "One user should be admin",
        status: false,
      }
      res.status(401).send(data)
    }
    else if(secondUser.isAdmin == true && user.isAdmin == true){
      var data = {
        error: "Admin can't chat with each other",
        status: false,
      }
      res.status(401).send(data)
    }
  })
  .catch((error) => {
   var data = {
      error: error.message,
      status: false,
    }
    res.status(401).send(data)
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
    { 
      errors: errors.array(),
      status:false,
    });
  }
  try {
    await CreateMessages(content,user)
    var data = {
      message:"Created",
      status:true,
    }
    res.status(201).send(data)
  } catch(e) {
    var data = {
      error:e.message,
      status:false,
    }
    res.status(500).send(data)
  }
}