import { getStateFromDb } from '../db/states.js'

export const StatesList = async () => {
    return await getStateFromDb()
}