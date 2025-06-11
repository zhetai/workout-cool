import { MetadataRoute } from "next/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: "https://www.workout.cool",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.workout.cool/auth/signin",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://www.workout.cool/auth/signup",
      lastModified: new Date().toISOString(),
    },
  ];

  return staticRoutes;
}
