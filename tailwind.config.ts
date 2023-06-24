import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { themesPlugin, configThemes } from "./twemes";
import animated from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    animated,
    themesPlugin(
      configThemes({
        themes: {
          navy: {
            base: colors.zinc[950],
            text: colors.zinc[50],
            primary: colors.zinc[100],
            "primary-forgeground": colors.zinc[800],
            secondary: colors.emerald[400],
            "secondary-foreground": colors.emerald[950],
            ring: colors.zinc[400],
            falopa: colors.pink[500],
          },
        },
      })
    ),
  ],
} satisfies Config;
