import { type Config } from "tailwindcss";
import { themesPlugin, configThemes } from "./twemes";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [themesPlugin(configThemes())],
} satisfies Config;
