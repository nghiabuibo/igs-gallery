'use strict';

/**
 * A set of functions called "actions" for `submission-search`
 */

export default async (ctx) => {
    try {
        let accessToken
        const { code } = ctx.request.params
        const submission = await strapi.service('api::submission.submission').findByCode(code)

        if (submission && submission.users.length) {
            const [user] = submission.users
            accessToken = strapi.plugin('users-permissions').service('jwt').issue({
                id: user.id,
            });
        }

        const message = submission ? 'Submission found!' : 'Submission not found!'
        return ctx.send({
            submission,
            accessToken,
            message
        })
    } catch (err) {
        ctx.body = err;
    }
};
