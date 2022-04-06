import functions from "firebase-functions"
import express from 'express'
import bodyParser from 'body-parser'
import { postSignals,GetAllSignalsList } from './controllers/signals.js'
import { postUser } from './controllers/users.js'
import { getGuidesList } from './controllers/guides.js'
import { getStatisticsList } from './controllers/statistics.js'
import { getChatMessagesWithAdminList,postChatMessage } from './controllers/adminChat.js'
import { signalValidation,userValidation,messageValidation,getMessageValidation } from './validation/index.js'
//import {routes} from './routes/index.js'

const app = express()
const app2 = express()
const app3 = express()
const app4 = express()
const app5 = express()
const app6 = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/',signalValidation, postSignals)


app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }))
app2.post('/',userValidation, postUser)

app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({ extended: true }))
app3.get('/',getStatisticsList)

app4.use(bodyParser.json());
app4.use(bodyParser.urlencoded({ extended: true }))
app4.get('/',getGuidesList)

app5.use(bodyParser.json());
app5.use(bodyParser.urlencoded({ extended: true }))
app5.get('/',getMessageValidation,getChatMessagesWithAdminList)

app6.use(bodyParser.json());
app6.use(bodyParser.urlencoded({ extended: true }))
app6.post('/',messageValidation,postChatMessage)


//app.get('/', (req, res) => res.send('App is working'))
//app.use('/api', routes)

// app.listen(5000, () => console.log('Example app listening on port 5000!'))

export const createSignal = functions.https.onRequest(app);
export const RegisterUser = functions.https.onRequest(app2);
export const getStatistics = functions.https.onRequest(app3);
export const getGuides = functions.https.onRequest(app4);
export const getAllSignals = functions.https.onRequest(app5);
export const getChatMessagesWithAdmin = functions.https.onRequest(app5);
export const sendChatMessage = functions.https.onRequest(app6);
