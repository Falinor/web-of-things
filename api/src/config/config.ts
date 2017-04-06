export const config = {
  app: {
    domain: process.env.APP_DOMAIN,
    port: process.env.APP_PORT || 3000
  },
  db: {
    uri: process.env.DB_URI
  },
  env: process.env.NODE_ENV || 'development',
  providers: {
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL
    }
  }
};
