module.exports = {
  fetchConvertKitSubscribers: {
    task: async ({ strapi }) => {
      try {
        const response = await fetch(`https://api.convertkit.com/v3/subscribers?api_secret=${process.env.CONVERTKIT_SECRET_KEY}`);
        const data = await response.json();

        if (!data.subscribers) {
          console.error('No subscribers found');
          return;
        }

        const subscribers = data.subscribers;
        const matchingIDs = new Set();
        const timestamp = new Date();

        // Get current subscribers and create a map of existing subscribers by their importID (ConvertKit ID)
        const currentSubscribers = new Map(
          (await strapi.entityService.findMany('api::subscriber.subscriber', {
            fields: ['id', 'importID']
          })).map(sub => [sub.importID, sub])
        );

        for (const subscriber of subscribers) {
          const { id: importID, email_address } = subscriber;
          const importIDStr = String(importID); // UIDs are strings in Strapi, while on convertkit ids are numbers.

          matchingIDs.add(importIDStr);

          // Check if subscriber already exists in Strapi
          if (currentSubscribers.has(importIDStr)) {
            // Update existing subscriber
            await strapi.entityService.update('api::subscriber.subscriber', currentSubscribers.get(importIDStr).id, {
              data: {
                email: email_address,
                importTimestamp: timestamp,
              }
            });
          } else {
            // Create new subscriber
            try {
              await strapi.entityService.create('api::subscriber.subscriber', {
                data: {
                  importID: importIDStr,
                  email: email_address,
                  importTimestamp: timestamp,
                  publishedAt: timestamp,
                }
              });
            } catch (createError) {
              console.error('Error creating subscriber:', createError);
              console.error('Validation errors:', createError.details.errors);
            }
          }
        }

        // Delete subscribers that are no longer in ConvertKit
        for (const [importID, subscriber] of currentSubscribers) {
          if (!matchingIDs.has(String(importID))) {
            await strapi.entityService.delete('api::subscriber.subscriber', subscriber.id);
          }
        }
        console.log('ConvertKit subscribers updated');
      } catch (error) {
        console.error('Error in fetchConvertKitSubscribers:', error);
      }
    },
    options: {
      rule: '0 1 * * *', // Once a day at 1 am.
    },
  },
};
