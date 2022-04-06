import { getAdminMessagingFromDb,CreateMessagesInDb } from '../db/adminChat.js'

export const MessagesWithAdmin = async (limit,lastDocId,userId,AdminId) => {
    return await getAdminMessagingFromDb(limit,lastDocId,userId,AdminId)
}

export const CreateMessages = async (content,user) => {
    return await CreateMessagesInDb(content,user)
}