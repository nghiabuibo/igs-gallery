'use-strict';

import { errors } from '@strapi/utils'
const { ApplicationError } = errors;

export default async (ctx, config, { strapi }) => {
    // validate submission
    const { refId: submissionID } = ctx.request.body
    const submission = await strapi.entityService.findOne('api::submission.submission', submissionID, {
        populate: ['media']
    })
    if (submission.media) throw new ApplicationError('File already uploaded!')

    // validate file
    const allowFileTypes = [
        'video/mov',
        'video/quicktime',
        'video/mp4',
        'image/png',
        'image/jpeg',
        'image/heif',
        'audio/mpeg',
        'audio/wav',
        'audio/x-m4a',
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.presentationml.template',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
    ]
    const { type } = ctx.request.files.files

    if (!allowFileTypes.includes(type)) throw new ApplicationError('File type is not allowed!')

    return true
}