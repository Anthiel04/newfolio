import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./app/i18n/request.ts" // path to the file we create below
);

export default withNextIntl({
  reactStrictMode: true,
});
