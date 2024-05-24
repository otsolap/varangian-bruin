const axios = require('axios');
const token = process.env.API_TOKEN

module.exports = {
  // Schedule: Once a day
  '0 1 * * *': async () => {
    try {
      console.log('Active subscriber data fetched from ConvertKit');
      // Fetch the form ID
      const headers = {
        Authorization: `Bearer ${token}`
       }

      const formResponse = await axios.get(`${process.env.PUBLIC_API_URL}/api/subscribe-form`, { headers });
      const formID = parseInt(formResponse.data.data.attributes.formID);

      if (!formID) {
        throw new Error('Form ID not found');
      }

      // Fetch subscribers from ConvertKit
      const subscribersResponse = await axios.get(`https://api.convertkit.com/v3/forms/${formID}/subscriptions`, {
        params: {
          api_secret: process.env.CONVERTKIT_SECRET_KEY,
          subscriber_state: 'active'
        }
      });

      // Create a map of active ConvertKit subscribers
      const activeSubscribers = new Map(subscribersResponse.data.subscriptions.map(sub => [sub.subscriber.id, sub.subscriber.email_address]));

      // Fetch all subscribers from Strapi
      const strapiSubscribers = await strapi.entityService.findMany('api::subscriber.subscriber');

      // Process each Strapi subscriber
      for (const subscriber of strapiSubscribers) {
        const convertKitID = subscriber.convertkitID;
        const email = activeSubscribers.get(convertKitID);

        // If the subscriber still exists in ConvertKit, update it
        if (email) {
          await strapi.entityService.update('api::subscriber.subscriber', subscriber.id, {
            data: {
              email: email,
              // Update other relevant fields if necessary
            }
          });
          // Remove the subscriber from the map of active subscribers
          activeSubscribers.delete(convertKitID);
        } else {
          // If the subscriber no longer exists in ConvertKit, delete it from Strapi
          await strapi.entityService.delete('api::subscriber.subscriber', subscriber.id);
        }
      }

      // Any remaining subscribers in the map of active subscribers are new, so create them in Strapi
      for (const [convertKitID, email] of activeSubscribers) {
        await strapi.service('api::subscriber.subscriber').createAndPublish({
          convertkitID: convertKitID,
          email: email,
          // Add other relevant fields
        });
      }

      console.log('Subscribers updated from ConvertKit');
    } catch (error) {
      console.error('Error updating subscribers from ConvertKit:', error.message);
    }
  },
};
