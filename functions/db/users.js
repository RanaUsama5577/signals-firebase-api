import {db,auth} from "../config.js"

export const RegisterUser = async (content) => {
  content.creationTimestamp = new Date();
  content.acceptedTermsTimestamp = new Date(content.acceptedTermsTimestamp)
  content.subscriptionType = content.subscriptionType
  delete content.password
  await db.collection("userData").doc(content.userId).set(content)
    .then(function(){
      console.log("user added");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
}
  
export const GetUserFromId = async (userId)=>{
  console.log("userId",userId)
  return await db.collection("userData").doc(userId).get()
  .then(function(docSnapshot){
    
    if(docSnapshot.exists){
      return docSnapshot.data()
    }
    else{
      return null
    }
  })
}