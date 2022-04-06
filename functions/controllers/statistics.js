import { StatisticsList } from '../services/statistics.js'

export const getStatisticsList = async (req, res, next) => {
    var list = await StatisticsList()
    var data = {
        status:true,
        data:list,
    }
    res.status(201).send(data)
  }