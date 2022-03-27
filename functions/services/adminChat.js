import { getAdminMessagingFromDb,CreateMessagesInDb } from '../db/adminChat.js'

export const MessagesWithAdmin = async (limit,lastDocId,user) => {
    return await getAdminMessagingFromDb(limit,lastDocId,user)
}

export const CreateMessages = async (content,user) => {
    return await CreateMessagesInDb(content,user)
}