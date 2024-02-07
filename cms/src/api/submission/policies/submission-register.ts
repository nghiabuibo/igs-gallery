'use strict';

import { errors } from '@strapi/utils'
const { ApplicationError } = errors;

import isValidEmail from '../../../utils/isValidEmail'

export default async (ctx, config, { strapi }) => {
    const entries = ctx.request.body
    if (!entries.length) throw new ApplicationError('Không có thông tin thành viên!')

    // validate entries
    for (let i in entries) {
        const entry = entries[i]

        // check if entry has enough data
        if (!entry.name || !entry.phone || !entry.email || !entry.address || !entry.birthday || !entry.school || !entry.grade) throw new ApplicationError(`Thành viên ${parseInt(i) + 1} chưa đủ thông tin!`)

        // validate email
        if (!isValidEmail(entry.email)) throw new ApplicationError(`Email ${entry.email} không hợp lệ!`)

        // validate grade options
        const userGrades = strapi.plugin('users-permissions').contentType('user').attributes.grade?.enum
        if (userGrades && userGrades.length && !userGrades.includes(entry.grade)) throw new ApplicationError(`${entry.grade} không hợp lệ!`)

        // check if user with email existed
        const [user] = await strapi.entityService.findMany('plugin::users-permissions.user', {
            fields: ['id'],
            limit: 1,
            filters: {
                email: entry.email
            }
        })
        if (user) throw new ApplicationError(`Email ${entry.email} đã được đăng ký!`)
    }

    return true;
};