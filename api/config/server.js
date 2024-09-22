const convertKitCron = require('./cron/convertKit');

module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  cron: {
    enabled: true,
    tasks: convertKitCron,
  },
  url: env('PUBLIC_API_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
