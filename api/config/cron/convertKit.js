module.exports = {
  // Once a day
  '0 1 * * *': async () => {
    try {
      const response = await fetch(`https://api.convertkit.com/v3/subscribers`, {
        params: {
          api_secret: process.env.CONVERTKIT_SECRET_KEY,
        }
      })

      const data = await response.json()

      if (!data.subscribers) {
        console.error('No subscribers found')
        return
      }

      const susbcribers = data.subscribers
      const matchingIDs = new Set()
      const timestamp = new Date()

      // Get current subscribers and create a map of existing subscribers by their convertkit_id
      const currentSubscribers = new Map(
        (await strapi.entityService.findMany('api::subscriber.subscriber', {
          fields: ['id', 'convertkitID']
        })).map(sub => [sub.convertkit_id, sub])
      )

      for(const subscriber of susbcribers) {
        const { id: convertkitID, email } = subscriber
        matchingIDs.add(convertkitID)

        // Check if subscriber already exists in Strapi
        if (currentSubscribers.has(convertkitID)) {
          // Update existing subscriber
          await strapi.entityService.update('api::subscriber.subscriber', currentSubscribers.get(convertkitID).id, {
            data: {
              email,
              timestamp: timestamp,
            }
          });
        } else {
          // Create new subscriber
          await strapi.entityService.createAndPublish('api::subscriber.subscriber', {
            id: convertkitID,
            convertkitID,
            email,
            importID: convertkitID,
            timestamp: timestamp,
          });
        }

      }

      // Delete subscribers that are no longer in ConvertKit
      for (const subscriber of currentSubscribers) {
        if (!matchingIDs.has(subscriber.convertkitID)) {
          await strapi.entityService.delete('api::subscriber.subscriber', subscriber.id)
        }
      }

      console.log('ConvertKit subscribers updated')
    } catch (error) {
      console.error(error)
    }
  }
}
