import handleVote from "../src/api/submission/sockets/handleVote";
import handleVoteAuth from "../src/api/submission/sockets/handleVoteAuth";
import handleVoteConnection from "../src/api/submission/sockets/handleVoteConnection";
import handleVoteFinal from "../src/api/submission/sockets/handleVoteFinal";

export default ({ env }) => ({
    email: {
        config: {
            provider: 'amazon-ses',
            providerOptions: {
                key: env('AWS_SES_KEY'),
                secret: env('AWS_SES_SECRET'),
                amazon: env('AWS_SES_REGION'),
            },
            settings: {
                defaultFrom: env('AWS_SES_FROM'),
                defaultReplyTo: env('AWS_SES_REPLY_TO'),
            },
        },
    },
    io: {
        enabled: true,
        config: {
            contentTypes: ['api::submission.submission'],
            events: [
                {
                    name: 'connection',
                    handler: handleVoteConnection
                },
                {
                    name: 'submission:auth',
                    handler: handleVoteAuth
                },
                {
                    name: 'submission:vote',
                    handler: handleVote
                },
                {
                    name: 'submission:voteFinal',
                    handler: handleVoteFinal
                }
            ],
            socket: {
                serverOptions: {
                    cors: { origin: '*' }
                }
            }
        }
    }
});
