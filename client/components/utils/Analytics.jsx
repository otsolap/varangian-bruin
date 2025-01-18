"use client";

import { pageView } from '@/utils/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

const Analytics = ({ analytics }) => {
  const { MATOMO_URL, CONTAINER_ID } = analytics;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageView(pathname);
    }
  }, [pathname, searchParams]);

  // TODO: Put this live when you are ready to track analytics.
  // if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
  //   return null;
  // }

  return (
    <>
      <noscript>
        <iframe
          src={`https://{$MATOMO_URL}/js/container_{$CONTAINER_ID}.js`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script
        id="mtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window._mtm = window._mtm || [];
            window._mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            (function() {
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.src='https://{$MATOMO_URL}/js/container_{$CONTAINER_ID}.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
        }}
      />
    </>
  );
}

export default Analytics;