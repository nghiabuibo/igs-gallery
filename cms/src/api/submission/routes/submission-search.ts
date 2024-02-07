'use strict';

export default {
    routes: [
        {
            method: 'GET',
            path: '/submissions/search/:code',
            handler: 'submission-custom.search'
        }
    ]
}