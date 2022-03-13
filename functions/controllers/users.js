import {CreateUser} from '../services/users.js'
import { validationResult  } from 'express-validator';

export const postUser = async (req, res, next) => {
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
    await CreateUser(content)
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