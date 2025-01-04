import { useContext } from 'react';
import Script from 'next/script';
import { GlobalContext } from '@/pages/_app.js'; 

const AnalyticsTagManager = () => {
  const { globalData } = useContext(GlobalContext);
  const { analytics } = globalData;
  const { analyticsTagManagerURL, siteID } = analytics.data;
  
  if (!analyticsTagManagerURL) return null;

  return (
    <Script 
      id="analytics-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=\`${analyticsTagManagerURL}\`; s.parentNode.insertBefore(g,s);
          })();
          
          // Initialize Matomo tracker
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="${analyticsTagManagerURL.split('/').slice(0, -1).join('/')}/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '${siteID}']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `,
      }}
    />
  );
};

export default AnalyticsTagManager;