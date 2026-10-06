const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sambathar.github.io";
export const siteConfig = {
  name: "Senior Cloud Infrastructure Engineer",
  description:
    "Portfolio of a Senior Cloud Infrastructure Engineer specializing in reliable, secure, and scalable cloud platforms.",
  url: configuredUrl.replace(/\/$/, ""),
  locale: "en_US",
} as const;
