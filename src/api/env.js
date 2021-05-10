const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        // client
        GOOGLE_ANALYTICS_ID: window.env?.GOOGLE_ANALYTICS_ID,
        API_HOST: window.env?.API_HOST,
        GRAASP_HOST: window.env?.GRAASP_HOST,
        SENTRY_DSN: window.env?.SENTRY_DSN,
        APP_VERSION: window.env?.APP_VERSION,
      }
    : {
        // server
        GOOGLE_ANALYTICS_ID: process.env.RAZZLE_GOOGLE_ANALYTICS_ID,
        API_HOST: process.env.RAZZLE_API_HOST,
        GRAASP_HOST: process.env.RAZZLE_GRAASP_EU,
        SENTRY_DSN: process.env.RAZZLE_SENTRY_DSN,
        APP_VERSION: process.env.npm_package_version,
      };

export default runtimeConfig;
