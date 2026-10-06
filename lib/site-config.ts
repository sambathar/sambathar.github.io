const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sambathar.github.io";
export const siteConfig = {
  name: "Sambath A R | Cloud Infrastructure & Microsoft 365 Engineer",
  description:
    "Cloud Infrastructure and IT Operations professional specializing in Microsoft 365, Azure, Intune, identity, automation, security and modern workplace engineering.",
  url: configuredUrl.replace(/\/$/, ""),
  locale: "en_US",
} as const;
