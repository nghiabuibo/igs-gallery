'use strict';

export default async () => {
    const voteSettings = await strapi.entityService.findMany('api::vote-setting.vote-setting')
    const currentTimestamp = Date.now()
    const startTimestamp = new Date(voteSettings.startTime).getTime()
    const endTimestamp = new Date(voteSettings.endTime).getTime()

    if (currentTimestamp < startTimestamp) return false
    if (endTimestamp && currentTimestamp > endTimestamp) return false

    return true
}