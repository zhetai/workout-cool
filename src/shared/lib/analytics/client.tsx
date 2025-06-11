import { OpenPanelComponent, type PostEventPayload, useOpenPanel } from "@openpanel/nextjs";

const isProd = process.env.NODE_ENV === "production";

const AnalyticsProvider = () => (
  <OpenPanelComponent
    clientId={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!}
    trackAttributes={true}
    trackOutgoingLinks={isProd}
    trackScreenViews={isProd}
  />
);

const track = (options: { event: string } & PostEventPayload["properties"]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { track: openTrack } = useOpenPanel();

  if (!isProd) {
    console.log("Track", options);
    return;
  }

  const { event, ...rest } = options;

  openTrack(event, rest);
};

export { AnalyticsProvider, track };
