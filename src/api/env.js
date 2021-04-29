const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        // client
        GOOGLE_ANALYTICS_ID: window.env?.GOOGLE_ANALYTICS_ID,
        API_HOST: window.env?.API_HOST,
        GRAASP_HOST: window.env?.GRAASP_HOST,
      }
    : {
        // server
        GOOGLE_ANALYTICS_ID: process.env.RAZZLE_GOOGLE_ANALYTICS_ID,
        API_HOST: process.env.RAZZLE_API_HOST,
        GRAASP_HOST: process.env.RAZZLE_GRAASP_EU,
      };

export default runtimeConfig;
