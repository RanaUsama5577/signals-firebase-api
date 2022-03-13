import { GuidesList } from '../services/guides.js'

export const getGuides = async (req, res, next) => {
    var list = await GuidesList()
    var data = {
        status:true,
        data:list,
    }
    res.status(201).send(data)
  }