'use strict';

export default async function getRoleIDByName(roleName) {
    if (!roleName) return
    const [role] = await strapi.entityService.findMany('plugin::users-permissions.role', {
        filters: {
            type: roleName
        }
    })
    return role.id ?? role
}