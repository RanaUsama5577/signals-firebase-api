import { addSignalInDb } from '../db/signals.js'
import {messaging} from "../config.js"


export const CreateSignals = async (content) => {
  try {
    if(content == null){
      throw new Error("the body has no data")
    }
    await addSignalInDb(content)
    const topic = '/topics/basic_signals';

    const message = {
      notification:{
        title: 'New signal created',
        body: 'New signal created with coin Id ' + content.coinId
      },
      data: {
        title: 'New signal created',
        body: 'New signal created with coin Id ' + content.coinId
      },
      topic: topic
    };
    return messaging.send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  } catch(e) {
    throw new Error(e.message)
  }
}
