// app/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const used = locale ?? routing.defaultLocale;

  if (!routing.locales.includes(used as any)) {
    throw new Error(`Unsupported locale "${used}"`);
  }

  // 1. load all namespace files for this locale
  const common   = (await import(`../messages/${used}/common.json`)).default;
  const about    = (await import(`../messages/${used}/about.json`)).default;
  const contact  = (await import(`../messages/${used}/contact.json`)).default;
  const projects = (await import(`../messages/${used}/projects.json`)).default;

  // 2. merge them into one object (namespace -> messages)
  return {
    locale: used,
    messages: {
      common,
      about,
      contact,
      projects
    }
  };
});