import { GuidesList } from '../services/guides.js'

export const getGuidesList = async (req, res, next) => {
    console.log("sfsaadasd")
    var list = await GuidesList()
    var data = {
        status:true,
        data:list,
    }
    res.status(201).send(data)
  }