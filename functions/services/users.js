import { RegisterUser } from '../db/users.js'

export const CreateUser = async (content) => {
  try {
    if(content == null){
      throw new Error("the body has no data")
    }
    await RegisterUser(content)
  } catch(e) {
    throw new Error(e.message)
  }
}