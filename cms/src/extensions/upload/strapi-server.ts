'use strict';

import uploadValidation from './policies/uploadValidation'

export default (plugin) => {
	plugin.policies['upload-validation'] = uploadValidation

	plugin.controllers['content-api'].uploadSubmission = async (ctx) => {
		// update submission description and status
		const { description, refId: submissionID } = ctx.request.body
		await strapi.entityService.update('api::submission.submission', submissionID, {
			data: {
				status: 'review',
				description
			}
		})

		// upload video
		await plugin.controllers['content-api'].upload(ctx)
	}

	plugin.routes['content-api'].routes.push({
		method: 'POST',
		path: '/submission',
		handler: 'content-api.uploadSubmission',
		config: {
			policies: ['upload-validation']
		}
	})

	return plugin
}