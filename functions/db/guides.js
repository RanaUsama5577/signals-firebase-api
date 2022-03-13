import {db} from "../config.js"

export const getGuideFromDb = async () => {
  var list = await db.collection("Guides").get()
  var data = []
  list.forEach(function(doc){
    data.push(doc.data())
  })
  return data
}