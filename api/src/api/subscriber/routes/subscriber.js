'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/subscribers/webhook/activate',
      handler: 'subscriber.webhookActivate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
