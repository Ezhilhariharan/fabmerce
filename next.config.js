const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    theme: "DEFAULT",
  },
  env: {
    ASP_API_URL: process.env.ASP_API_URL,
    ENABLE_GOOGLE_ANALYTICS:process.env.ENABLE_GOOGLE_ANALYTICS,
    GOOGLE_SITE_VERIFICATION:process.env.GOOGLE_SITE_VERIFICATION,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            fallback: require.resolve("file-loader"),
          },
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true,
    domains: ["www.fabmerce.com", "assets.preprod.aptonshops.com","assets.aptonshops.com","storage.googleapis.com","www.fabmerce.in"],
  },
});
