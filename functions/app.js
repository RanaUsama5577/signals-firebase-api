import functions from "firebase-functions"
import express from 'express'
import bodyParser from 'body-parser'

import {routes} from './routes/index.js'

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('App is working'))
app.use('/api', routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))

export const nodeapp = functions.https.onRequest(app);
