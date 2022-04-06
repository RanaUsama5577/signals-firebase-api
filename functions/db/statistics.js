import {db} from "../config.js"

export const getStatisticsFromDb = async () => {
  var list = await db.collection("Statistics").get()
  var data = []
  list.forEach(function(doc){
    data.push(doc.data())
  })
  return data
}