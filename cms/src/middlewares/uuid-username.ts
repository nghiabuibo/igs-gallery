'use strict';

import crypto from 'crypto'

/**
 * `uuid-username` middleware
 */

export default (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.request.method !== 'POST' || ctx.request.url !== '/api/auth/local/register') {
      return await next()
    }
    
    if (ctx.request.body.username) return await next()
    
    strapi.log.info('In uuid-username middleware.');
    
    const uuid = crypto.randomUUID()
    ctx.request.body.username = uuid

    await next()
  };
};
