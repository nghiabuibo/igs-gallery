'use strict';

import isVoteable from "../../../utils/isVoteable"
import verifyGoogleCredential from "../../../utils/verifyGoogleCredential"
import updateVotes from "../../../utils/updateVotes"

export default async ({ strapi, io }, socket, code) => {
    const isVoteableCheck = await isVoteable()
    if (!isVoteableCheck) {
        socket.emit('socket:warn', 'Unable to vote at this time!')
        return
    }

    const { credential } = socket.handshake.query
    // @ts-ignore
    const { email } = await verifyGoogleCredential(credential).catch((err) => {
        console.error(err)
        socket.emit('socket:error', err.message)
    })

    if (!email) {
        socket.emit('socket:error', 'Invalid email!')
        return
    }

    const submission = await strapi.service('api::submission.submission').findByCode(code)

    if (!submission) {
        socket.emit('socket:error', 'Submission not found!')
        return
    }

    const submissionVotes = submission.votes ?? []
    const updatedVotes = updateVotes(submissionVotes, email)
    
    const updateSubmission = await strapi.entityService.update('api::submission.submission', submission.id, {
        data: {
            votes: updatedVotes
        }
    }).catch((err) => {
        console.log(err)
        socket.emit('socket:error', err.message)
    })

    io.raw({
        event: 'submission:voted',
        data: updateSubmission
    })
}