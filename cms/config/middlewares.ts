export default ({ env }) => ([
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formidable: {
        maxFileSize: env('UPLOAD_MAX_SIZE_MB') * 1024 * 1024
      }
    }
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]);
