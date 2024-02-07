'use strict';

export default (plugin) => {
    plugin.controllers.user.grades = (ctx) => {
        const grades = strapi.plugin('users-permissions').contentType('user').attributes.grade?.enum?.filter(grade => grade !== 'N/A')
        return ctx.send({ grades })
    }

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/user/grades',
        handler: 'user.grades',
        config: {
            prefix: ''
        }
    })

    return plugin
}