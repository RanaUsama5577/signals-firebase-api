import { getStatisticsFromDb } from '../db/statistics.js'

export const StatisticsList = async () => {
    return await getStatisticsFromDb()
}