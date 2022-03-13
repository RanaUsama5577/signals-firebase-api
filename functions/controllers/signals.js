import {CreateSignals} from '../services/signals.js'
import { validationResult  } from 'express-validator';

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