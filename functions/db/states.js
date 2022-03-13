import {db} from "../config.js"

export const getStateFromDb = async () => {
  var list = await db.collection("States").get()
  var data = []
  list.forEach(function(doc){
    data.push(doc.data())
  })
  return data
}