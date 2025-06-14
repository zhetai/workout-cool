import Image from "next/image";
import { Inter, Permanent_Marker } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { cn } from "@/shared/lib/utils";
import { getServerUrl } from "@/shared/lib/server-url";
import { FB_PIXEL_ID } from "@/shared/lib/facebook/fb-pixel";
import { SiteConfig } from "@/shared/config/site-config";
import { Header } from "@/features/layout/Header";
import { Footer } from "@/features/layout/Footer";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { NextTopLoader } from "@/components/ui/next-top-loader";
import FacebookPixel from "@/components/FacebookPixel";

import { Providers } from "./providers";

import type { ReactElement } from "react";
import type { Metadata } from "next";

import "@/shared/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: `%s | ${SiteConfig.title}`,
  },
  description: SiteConfig.description,
  metadataBase: new URL(getServerUrl()),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SiteConfig.title,
    description: SiteConfig.description,
    url: getServerUrl(),
    siteName: SiteConfig.title,
    images: [
      {
        url: `${getServerUrl()}/images/default-og-image_fr.png`,
        width: 1200,
        height: 630,
        alt: SiteConfig.title,
      },
      {
        url: `${getServerUrl()}/images/default-og-image_en.png`,
        width: 1200,
        height: 630,
        alt: SiteConfig.title,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@workout_cool",
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [`${getServerUrl()}/images/default-og-image_fr.png`],
  },
  alternates: {
    canonical: "https://www.workout.cool",
    languages: {
      fr: "https://www.workout.cool/fr",
      en: "https://www.workout.cool/en",
    },
  },
  authors: [{ name: "Workout Cool", url: "https://www.workout.cool" }],
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-permanent-marker",
  display: "swap",
});

export const preferredRegion = ["fra1", "sfo1", "iad1"];

interface RootLayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}

export default async function RootLayout({ params, children }: RootLayoutProps) {
  const { locale } = await params;

  return (
    <>
      <html className="h-full" dir="ltr" lang={locale} suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta content="#f3f4f6" media="(prefers-color-scheme: light)" name="theme-color" />
          <meta content="#18181b" media="(prefers-color-scheme: dark)" name="theme-color" />
          <meta content="width=device-width, initial-scale=1, maximum-scale=1 viewport-fit=cover" name="viewport" />
          <link href="/site.webmanifest" rel="manifest" />

          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="preload" />

          {/* Alternate hreflang for i18n */}
          <link href="https://www.workout.cool/fr" hrefLang="fr" rel="alternate" />
          <link href="https://www.workout.cool/en" hrefLang="en" rel="alternate" />

          {/* TODO: maybe add some ads ? */}
          <noscript>
            <Image
              alt="Facebook Pixel"
              height="1"
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              style={{ display: "none" }}
              width="1"
            />
          </noscript>
        </head>

        <body
          className={cn(
            "flex flex-col justify-between items-center p-8 min-h-screen max-sm:p-0 max-sm:min-h-full text-sm/[22px] font-normal text-base-content bg-base-200 dark:bg-[#18181b] dark:text-gray-200 antialiased",
            "bg-hero-light dark:bg-hero-dark",
            GeistMono.variable,
            GeistSans.variable,
            inter.variable,
            permanentMarker.variable,
          )}
          suppressHydrationWarning
        >
          <Providers locale={locale}>
            {/* <WorkoutSessionsSynchronizer /> */}
            <NextTopLoader color="#FF5722" delay={100} showSpinner={false} />

            {/* Main Card Container */}
            <div className="card bg-base-100 dark:bg-[#232324] shadow-xl w-full max-w-3xl max-sm:rounded-none max-sm:h-full border border-base-200 dark:border-gray-800">
              <div className="card-body p-0">
                <Header />
                <div className="px-2 sm:px-6 pb-6">{children}</div>
              </div>
              <Footer />
            </div>

            <TailwindIndicator />
            <FacebookPixel />
          </Providers>
        </body>
      </html>
    </>
  );
}
