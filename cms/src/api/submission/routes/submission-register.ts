'use strict';

export default {
    routes: [
        {
            method: 'POST',
            path: '/submissions/register',
            handler: 'submission-custom.register',
            config: {
                policies: ['submission-register']
            }
        }
    ]
}