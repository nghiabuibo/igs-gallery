'use strict';

import { OAuth2Client } from 'google-auth-library'

export default async (credential) => {
    try {
        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GG_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload
    } catch (err) {
        console.log(err)
        return err
    }
}