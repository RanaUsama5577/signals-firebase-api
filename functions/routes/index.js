import { Router } from 'express'

import { postSignals,GetAllSignals } from '../controllers/signals.js'
import { postUser } from '../controllers/users.js'
import { getGuides } from '../controllers/guides.js'
import { getStatistics } from '../controllers/statistics.js'
import { getChatMessagesWithAdmin,sendChatMessage } from '../controllers/adminChat.js'
import { signalValidation,userValidation,messageValidation,getMessageValidation } from '../validation/index.js'

export const routes = Router()

routes.post('/createSignal',signalValidation, postSignals)
routes.post('/RegisterUser',userValidation, postUser)
routes.get('/getGuides',getGuides)
routes.get('/getStatistics',getStatistics)
routes.get('/getAllSignals',GetAllSignals)
routes.get('/getChatMessagesWithAdmin',getMessageValidation,getChatMessagesWithAdmin)
routes.post('/sendChatMessage',messageValidation,sendChatMessage)