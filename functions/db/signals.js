import * as utils from "../utils/index.js"
import {db} from "../config.js"
import {GetCoinPrice} from "../services/signals.js"


export const addSignalInDb = async (content) => {
  var timestamp = utils.GetTimestamp();
  content.SignalTimestamp = new Date();
  await db.collection("signals").doc(timestamp).set(content)
    .then(function(){
      console.log("signal added");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
}
  
export const getSignalsFromDb = async (limit,lastDocId,user) => {
  var list = db.collection("signals")
  if(lastDocId != ""){
    var lastDoc = await db.collection("signals").doc(lastDocId).get()
    if(lastDoc.exists){
      list  = list.startAfter(lastDoc)
    }
  }
  console.log("limit",limit)
  list = await list.limit(limit).get()
  console.log("list.size",list.size)
  var data = []
  var currencies = list.docs.map(item=>item.data().coinId)
  var prices = await GetCoinPrice(currencies,"usd")

  list.forEach(function(doc){
    var value = doc.data()
    var price =  prices[value.coinId]==undefined?0:prices[value.coinId].usd??0
    var originalval = {
      doc_id:doc.id,
      coinId:value.coinId,
      coinPrice:price,
      subscriptionType:user.subscriptionType,
      risk:value.risk,
      scalp:value.scalp,
      stop:value.stop,
      targetList:value.targetList,
      signalTimestamp:value.signalTimestamp,
    }
    var fakeval = {
      doc_id:doc.id,
      coinId:value.coinId,
      coinPrice:price,
      subscriptionType:user.subscriptionType,
      risk:0,
      scalp:0,
      stop:0,
      targetList:[],
      signalTimestamp:value.signalTimestamp,
    }
    if(user.subscriptionType == 102){
      data.push(fakeval)
    }
    else if(user.subscriptionType == 101){
      data.push(originalval)
    }
    else{
      data.push(originalval)
    }
  })
  return data
}