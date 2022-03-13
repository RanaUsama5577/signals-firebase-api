import * as utils from "../utils/index.js"
import {db} from "../config.js"


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
  