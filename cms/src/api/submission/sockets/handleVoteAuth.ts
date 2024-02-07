'use-strict';

import verifyGoogleCredential from "../../../utils/verifyGoogleCredential"

export default async ({ strapi }, socket) => {
    const { credential } = socket.handshake.query
    const payload = await verifyGoogleCredential(credential).catch((err) => {
        console.error(err)
        socket.emit('socket:error', err.message)
    })

    if (!payload) return
    socket.emit('submission:authed', payload)
}