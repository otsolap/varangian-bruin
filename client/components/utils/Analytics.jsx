"use client";
import { SITE_URL, TAG_MANAGER_ID, pageView } from '@/utils/analytics';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

const Analytics = ({ analytics }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      pageView(pathname);
    }
  }, [pathname, searchParams]);

  if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://${SITE_URL}/js/container_${TAG_MANAGER_ID}.js`}
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
              g.type='text/javascript'; g.async=true; g.src='https://${SITE_URL}/js/container_${TAG_MANAGER_ID}.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
        }}
      />
    </>
  );
}

export default Analytics;