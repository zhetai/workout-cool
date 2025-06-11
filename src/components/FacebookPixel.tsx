"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import * as pixel from "@/workoutcool/shared/lib/facebook/fb-pixel";

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;

    // setTimeout(() => {
    pixel.pageview();
    // }, 200);
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        data-pixel-id={pixel.FB_PIXEL_ID}
        id="fb-pixel"
        onLoad={() => setLoaded(true)}
        src="/scripts/pixel.js"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default FacebookPixel;
