import { Router } from 'express'

import { postSignals,GetAllSignals } from '../controllers/signals.js'
import { postUser } from '../controllers/users.js'
import { getGuides } from '../controllers/guides.js'
import { getStates } from '../controllers/states.js'
import { signalValidation,userValidation,messageValidation } from '../validation/index.js'

export const routes = Router()

routes.post('/createSignal',signalValidation, postSignals)
routes.post('/RegisterUser',userValidation, postUser)
routes.get('/getGuides',getGuides)
routes.get('/getStates',getStates)
routes.get('/getAllSignals',GetAllSignals)
// routes.get('/getChatMessagesWithAdmin',getChatMessagesWithAdmin)
// routes.get('/sendChatMessage',messageValidation,sendChatMessage)