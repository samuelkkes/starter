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
  plugins: [
    i18n({
      translations: locales,
      defaultLocale: "fr",
      detection: ["cookie", "header"],
    }),
    nextCookies(), // doit rester le dernier plugin
  ],
});
