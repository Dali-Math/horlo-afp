import { createLocalizedPathnamesNavigation, Pathnames } from "next-intl/navigation";

export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr";

export const pathnames = {
  "/": "/",
  "/pratique": {
    fr: "/pratique",
    en: "/practice",
  },
  "/theorie": {
    fr: "/theorie",
    en: "/theory",
  },
  "/quiz": {
    fr: "/quiz",
    en: "/quiz",
  }
} satisfies Pathnames<typeof locales>;

export const routing = {
  locales,
  defaultLocale,
  pathnames,
};

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, pathnames, defaultLocale });
