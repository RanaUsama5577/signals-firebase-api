import {CreateSignals,GetSignals} from '../services/signals.js'
import { validationResult  } from 'express-validator';
import {GetUserFromId} from "../db/users.js"
/*
 * call other imported services, or same service but different functions here if you need to
*/
export const postSignals = async (req, res, next) => {
  const content = req.body
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

export const GetAllSignals = async (req, res, next) => {
  const content = req.query
  var user = ""
  //Get User
  const authorization = req.header('Authorization')
  await auth.verifyIdToken(authorization)
  .then((decodedToken) => {
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
      error: e.message,
      status: false,
    }
    res.status(401).send(data)
  });
  //Get Signals   
  var limit = content.limit??20
  var DocId = content.lastDocId??""
  try {
    var response = await GetSignals(limit,DocId,user)
    res.status(200).send(response)
  } catch(e) {
    var data = {
      error: e.message,
      status: false,
    }
    res.status(500).send(data)
  }
}