'use strict';

/**
 * submission service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::submission.submission', ({ strapi }) => ({
    async findByCode(code) {
        if (!code) return;

        const [submission] = await strapi.entityService.findMany('api::submission.submission', {
            limit: 1,
            filters: {
                code
            },
            populate: ['users', 'video']
        })

        return submission
    }
}));
