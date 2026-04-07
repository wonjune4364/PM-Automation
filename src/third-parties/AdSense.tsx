"use client";

import Script from "next/script";

export const ADSENSE_CLIENT_ID = "ca-pub-9147324916971040";

export default function AdSense() {
  // Load script only in production environment
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9147324916971040"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

// AdSense ad component
export function AdSenseAd({
  slot,
  style = {},
}: {
  slot: string;
  style?: React.CSSProperties;
}) {
  // Display ad only in production environment
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <div style={{ display: "block", textAlign: "center", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsense-ad-${slot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
