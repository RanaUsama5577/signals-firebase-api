import { getGuideFromDb } from '../db/guides.js'

export const GuidesList = async () => {
    return await getGuideFromDb()
}