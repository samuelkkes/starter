import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { i18n, locales } from "@better-auth/i18n";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Production note: the limiter counts requests per client IP, read from
  // X-Forwarded-For by default, which clients can spoof. Behind a proxy or
  // host, set advanced.ipAddress.ipAddressHeaders to the header your proxy
  // overwrites (e.g. ["cf-connecting-ip"]). Without a trusted client IP the
  // limits are easy to bypass.
  rateLimit: {
    enabled: true, // also on in development (off by default there)
    storage: "database", // counters persisted in PostgreSQL (rateLimit table)
    window: 10, // seconds
    max: 100, // requests per window
    customRules: {
      // /sign-in/email is already limited by default to 3 requests / 10 s
      "/sign-up/email": { window: 60, max: 5 },
    },
  },
  plugins: [
    i18n({
      translations: locales,
      defaultLocale: "fr",
      detection: ["cookie", "header"],
    }),
    nextCookies(), // must stay the last plugin
  ],
});
