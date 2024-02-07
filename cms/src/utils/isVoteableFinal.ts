'use strict';

export default async () => {
    const voteSettings = await strapi.entityService.findMany('api::vote-setting.vote-setting')
    return voteSettings.finalRound
}