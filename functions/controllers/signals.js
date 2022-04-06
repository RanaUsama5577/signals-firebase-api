import {CreateSignals,GetSignals} from '../services/signals.js'
import { validationResult  } from 'express-validator';
import {GetUserFromId} from "../db/users.js"
import {auth} from "../config.js"
/*
 * call other imported services, or same service but different functions here if you need to
*/
export const postSignals = async (req, res, next) => {
  const content = req.body
  var user = ""
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
    else if(!user.isAdmin){
      var data = {
        error: "Only admin user can access this api",
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
    await CreateSignals(content)
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

export const GetAllSignalsList = async (req, res, next) => {
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
  //Get Signals   
  var limit = parseInt(content.limit??20)
  var DocId = content.lastDocId??""
  try {
    var response = await GetSignals(limit,DocId,user)
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