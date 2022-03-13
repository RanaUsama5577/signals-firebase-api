import {db,auth} from "../config.js"

export const RegisterUser = async (content) => {
  content.creationTimestamp = new Date();
  await auth.getUserByEmail(content.email)
  .then((userRecord) => {
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    throw new Error("User already exists with this email")
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
  try{
    var user = await auth.createUser({
        email: content.email,
        password: content.password,
        displayName: content.userName,
      });
  }
  catch(ex){
    console.log('error', ex.message)
    throw new Error(ex.message)
  }
  
  content.userId = user.uid
  content.acceptedTermsTimestamp = new Date(content.acceptedTermsTimestamp)
  await db.collection("userData").doc(user.uid).set(content)
    .then(function(){
      console.log("user added");
      return 1;
    })
    .catch(function(error){
      console.log("error",error.message);
      throw new Error(e.message)
    })
}
  