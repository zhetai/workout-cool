// import { getCookieConsent } from "./cookieConsent";

import { env } from "@/env";

export const FB_PIXEL_ID = env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
// disable ts error for window

export const pageview = () => {
  // Vérifier le consentement avant d'envoyer des événements
  //   if (getCookieConsent() === false) return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const event = (name: string, options = {}) => {
  // Vérifier le consentement avant d'envoyer des événements
  //   if (getCookieConsent() === false) return;

  //eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.fbq("track", name, options);
};
