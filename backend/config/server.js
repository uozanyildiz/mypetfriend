module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  apiKey: env("MAPS_API_KEY", ""),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b5fbbb8dfe2854153c5469e5c08b6691"),
    },
  },
});
