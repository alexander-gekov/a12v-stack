import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      baseUrl: process.env.BASE_URL,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      vercelEnv: process.env.VERCEL_ENV,
    },
    openaiApiKey: process.env.OPENAI_API_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePriceId: process.env.STRIPE_PRICE_ID,
    stripePriceIdTeam: process.env.STRIPE_PRICE_ID_TEAM,
    stripeCouponId: process.env.STRIPE_COUPON_ID,
    polarAccessToken: process.env.POLAR_ACCESS_TOKEN,
    polarCheckoutSuccessUrl: process.env.POLAR_SUCCESS_URL,
    polarServer: process.env.POLAR_SERVER,
  },
  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@pinia/nuxt",
    "@clerk/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "@polar-sh/nuxt",
  ],

  colorMode: {
    classSuffix: "",
    fallback: "light",
    storageKey: "color-mode",
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  devtools: { enabled: true },

  devServer: {
    host: "localhost",
    port: 3000,
  },

  imports: {
    autoImport: true,
  },

  supabase: {
    redirect: false,
  },

  css: ["~/assets/css/styles.css"],

  vite: {
    plugins: [tailwindcss()],
    define: {
      __VUE_PROD_DEVTOOLS__: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./"),
      },
    },
  },

  nitro: {
    preset: "vercel",
    output: {
      dir: "../../.vercel/output",
    },
    vercel: {
      functions: {
        maxDuration: 60,
      },
    },
  },

  dayjs: {
    locales: ["en", "bg"],
    defaultLocale: "en",
    defaultTimezone: "Europe/Sofia",
    plugins: ["relativeTime", "advancedFormat", "duration", "timezone", "utc"],
  },

  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/auth", pathPrefix: true, prefix: "Auth" },
    { path: "~/components/layout", pathPrefix: true, prefix: "Layout" },
  ],

  plugins: [
    {
      src: "~/plugins/vue-query.ts",
    },
  ],
});
