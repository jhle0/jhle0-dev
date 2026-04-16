export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return "ko";
}

export function stripLocaleFromPath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    return pathname.replace(/^\/en/, "") || "/";
  }

  return pathname || "/";
}

export function localizePath(locale: Locale, pathname: string): string {
  const normalized = pathname === "" ? "/" : pathname;
  if (locale === "ko") return normalized;
  if (normalized === "/") return "/en/";
  return `/en${normalized}`;
}

export const ui = {
  ko: {
    skipToContent: "본문으로 건너뛰기",
    nav: {
      home: "Home",
      about: "About",
      now: "Now",
      blog: "Blog",
      projects: "Projects",
      contact: "Contact",
    },
    theme: {
      label: "테마 전환",
      system: "System",
      light: "Light",
      dark: "Dark",
    },
    footer: {
      description: "CS와 AI를 공부하며 쌓아가는 개인 개발 블로그.",
      builtWith: "Astro로 만들고 Vercel에 배포했습니다.",
    },
  },
  en: {
    skipToContent: "Skip to content",
    nav: {
      home: "Home",
      about: "About",
      now: "Now",
      blog: "Blog",
      projects: "Projects",
      contact: "Contact",
    },
    theme: {
      label: "Theme switcher",
      system: "System",
      light: "Light",
      dark: "Dark",
    },
    footer: {
      description: "A personal developer blog built around CS and AI notes.",
      builtWith: "Built with Astro · Deployed on Vercel",
    },
  },
} as const;
