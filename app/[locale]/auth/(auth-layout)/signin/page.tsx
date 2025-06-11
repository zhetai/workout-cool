import { cookies } from "next/headers";

import { isEU } from "@/shared/lib/location/location";
import { Cookies } from "@/shared/constants/cookies";
import { ConsentBanner } from "@/features/consent-banner/ui/consent-banner";
import { CredentialsLoginForm } from "@/features/auth/signin/ui/CredentialsLoginForm";

export default async function AuthSignInPage() {
  const cookiesStore = await cookies();
  const isEuropeanUnion = await isEU();
  const showTrackingConsent = isEuropeanUnion && !cookiesStore.has(Cookies.TrackingConsent);

  return (
    <>
      <CredentialsLoginForm />
      {showTrackingConsent && <ConsentBanner />}
    </>
  );
}
