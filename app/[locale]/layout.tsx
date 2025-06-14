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
  title: SiteConfig.title,
  description: SiteConfig.description,
  metadataBase: new URL(getServerUrl()),
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
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          {/* SEO */}
          <meta content="index, follow" name="robots" />
          <meta content="Workout Cool" name="author" />

          {/* Favicon */}
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/images/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/images/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/images/favicon.ico" rel="shortcut icon" />

          {/* Open Graph */}
          <meta content={SiteConfig.title} property="og:title" />
          <meta content={SiteConfig.description} property="og:description" />
          <meta content={"https://www.workout.cool"} property="og:url" />
          <meta content="website" property="og:type" />
          <meta content={`${getServerUrl()}/images/default-og-image_${locale}.png`} property="og:image" />

          {/* Twitter */}
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@workout_cool" name="twitter:site" />
          <meta content={SiteConfig.title} name="twitter:title" />
          <meta content={SiteConfig.description} name="twitter:description" />
          <meta content={`${getServerUrl()}/images/default-og-image_${locale}.png`} name="twitter:image" />

          {/* Canonical */}
          <link href="https://www.workout.cool" rel="canonical" />

          {/* Open Graph Locale */}
          <meta content={locale === "fr" ? "fr_FR" : "en_US"} property="og:locale" />
          <meta content="fr_FR" property="og:locale:alternate" />
          <meta content="en_US" property="og:locale:alternate" />

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
            GeistMono.variable,
            GeistSans.variable,
            inter.variable,
            permanentMarker.variable,
          )}
          style={{
            backgroundImage:
              "radial-gradient(circle at 82% 60%, rgba(59, 59, 59,0.06) 0%, rgba(59, 59, 59,0.06) 69%,transparent 69%, transparent 100%),radial-gradient(circle at 36% 0%, rgba(185, 185, 185,0.06) 0%, rgba(185, 185, 185,0.06) 59%,transparent 59%, transparent 100%),radial-gradient(circle at 58% 82%, rgba(183, 183, 183,0.06) 0%, rgba(183, 183, 183,0.06) 17%,transparent 17%, transparent 100%),radial-gradient(circle at 71% 32%, rgba(19, 19, 19,0.06) 0%, rgba(19, 19, 19,0.06) 40%,transparent 40%, transparent 100%),radial-gradient(circle at 77% 5%, rgba(31, 31, 31,0.06) 0%, rgba(31, 31, 31,0.06) 52%,transparent 52%, transparent 100%),radial-gradient(circle at 96% 80%, rgba(11, 11, 11,0.06) 0%, rgba(11, 11, 11,0.06) 73%,transparent 73%, transparent 100%),radial-gradient(circle at 91% 59%, rgba(252, 252, 252,0.06) 0%, rgba(252, 252, 252,0.06) 44%,transparent 44%, transparent 100%),radial-gradient(circle at 52% 82%, rgba(223, 223, 223,0.06) 0%, rgba(223, 223, 223,0.06) 87%,transparent 87%, transparent 100%),radial-gradient(circle at 84% 89%, rgba(160, 160, 160,0.06) 0%, rgba(160, 160, 160,0.06) 57%,transparent 57%, transparent 100%),linear-gradient(90deg, rgb(254,242,164),rgb(166, 255, 237))",
          }}
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
