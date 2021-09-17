const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        // client
        GOOGLE_ANALYTICS_ID: window.env?.GOOGLE_ANALYTICS_ID,
        API_HOST: window.env?.API_HOST,
        SENTRY_DSN: window.env?.SENTRY_DSN,
        APP_VERSION: window.env?.APP_VERSION,
        PUBLISHED_TAG_ID: window.env?.PUBLISHED_TAG_ID,
        GRAASP_AUTH_HOST: window.env?.GRAASP_AUTH_HOST,
        GRAASP_PERFORM_HOST: window.env?.GRAASP_PERFORM_HOST,
      }
    : {
        // server
        GOOGLE_ANALYTICS_ID: process.env.RAZZLE_GOOGLE_ANALYTICS_ID,
        API_HOST: process.env.RAZZLE_API_HOST,
        SENTRY_DSN: process.env.RAZZLE_SENTRY_DSN,
        APP_VERSION: process.env.npm_package_version,
        PUBLISHED_TAG_ID: process.env.RAZZLE_PUBLISHED_TAG_ID,
        GRAASP_AUTH_HOST: process.env.RAZZLE_GRAASP_AUTH_HOST,
        GRAASP_PERFORM_HOST: process.env.RAZZLE_GRAASP_PERFORM_HOST,
      };

export default runtimeConfig;
