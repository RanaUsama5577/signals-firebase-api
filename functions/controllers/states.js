import { StatesList } from '../services/states.js'

export const getStates = async (req, res, next) => {
    var list = await StatesList()
    var data = {
        status:true,
        data:list,
    }
    res.status(201).send(data)
  }