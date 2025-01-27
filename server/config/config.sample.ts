export const config = {
  KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID! || "<your_client_id>", // your kinde client id
  KINDE_CLIENT_SECRET:
    process.env.KINDE_CLIENT_SECRET! || "<your_client_secret>", // your kinde client secret
  KINDE_LOGOUT_REDIRECT_URI:
    process.env.KINDE_LOGOUT_REDIRECT_URI! || "http://localhost:3000", // your logout redirect uri
  KINDE_DOMAIN: process.env.KINDE_DOMAIN! || "https://yourdomain.kinde.com", // your kinde domain
  KINDE_REDIRECT_URI:
    process.env.KINDE_REDIRECT_URI! || "http://localhost:5173/api/callback", // your callback redirect uri
  NODE_ENV: process.env.NODE_ENV || "development",
};
