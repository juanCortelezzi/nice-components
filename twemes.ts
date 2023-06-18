import Color from "color";
import plugin from "tailwindcss/plugin";

function addTacksToRecordKeys<K extends string, V>(record: Record<K, V>) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [`--${key}`, value]),
  ) as Record<`--${K}`, V>;
}

export type Config = ReturnType<typeof configThemes>;
export const configThemes = <
  const Colors extends string,
  const Themes extends string,
  const Config extends Themes,
>(rawConfig?: {
  themes?: Record<Themes, Record<Colors, string>>;
  options?: {
    asRoot?: Config & Themes; // a little trick to avoid mutating the Themes Generic
    prefersLight?: Config & Themes;
    prefersDark?: Config & Themes;
    attribute?: string;
  };
}) => {
  if (!rawConfig) return {};
  const { themes, options } = rawConfig;
  for (const themeName in themes) {
    for (const colorName in themes[themeName]) {
      try {
        themes[themeName][colorName] = Color(themes[themeName][colorName])
          .hsl()
          .toString();
      } catch (e) {
        console.error(
          "\nTailwind-themes: There was an error parsing a color value in your config!\n\n",
          e,
        );
      }
    }
  }

  // awful validation!
  const values = Object.values(options ?? {});
  if (values.length !== new Set(values).size) {
    console.error(`
Tailwind-themes: There was an error parsing the options, make sure that the
values for each option are unique.

`);
  }

  return { themes, options };
};

export const themesPlugin = plugin.withOptions<Config>(
  (config) => {
    return ({ addBase, addComponents }) => {
      if (!config.themes) return;

      let themesArray = Object.entries(config.themes);

      if (config.options?.asRoot) {
        const root = config.themes[config.options.asRoot];
        if (!root) {
          return console.error(`
Tailwind-themes: \`config.options.asRoot\` is set but not found in 
\`config.options.themes\`. The theme was: \`${config.options.asRoot}\`

`);
        }

        themesArray = themesArray.filter(
          ([name, _colors]) => name === config.options?.asRoot,
        );
        addBase({
          [":root"]: addTacksToRecordKeys(root),
        });
      }

      if (config.options?.prefersLight) {
        const light = config.themes[config.options.prefersLight];
        if (!light) {
          return console.error(`
Tailwind-themes: \`config.options.prefersLight\` is set but not found in 
\`config.options.themes\`. The theme was: \`${config.options.prefersLight}\`

`);
        }

        themesArray = themesArray.filter(
          ([name, _colors]) => name === config.options?.prefersLight,
        );
        addBase({
          ["@media (prefers-color-scheme: light)"]: {
            [":root"]: addTacksToRecordKeys(light),
          },
        });
      }

      if (config.options?.prefersDark) {
        const dark = config.themes[config.options.prefersDark];
        if (!dark) {
          return console.error(`
Tailwind-themes: \`config.options.prefersDrak\` is set but not found in 
\`config.options.themes\`. The theme was: \`${config.options.prefersDark}\`

`);
        }

        themesArray = themesArray.filter(
          ([name, _colors]) => name === config.options?.prefersDark,
        );
        addBase({
          ["@media (prefers-color-scheme: dark)"]: {
            [":root"]: addTacksToRecordKeys(dark),
          },
        });
      }

      if (config.options?.attribute === "class") {
        for (const [name, colors] of themesArray) {
          addComponents({
            [`.theme-${name}`]: addTacksToRecordKeys(colors),
          });
        }
      } else {
        for (const [name, colors] of themesArray) {
          const dataTag = config.options?.attribute ?? "data-theme";
          addBase({
            [`[${dataTag}=${name}]`]: addTacksToRecordKeys(colors),
          });
        }
      }
    };
  },
  (config) => {
    if (!config.themes) return {};
    const themesArray = Object.values(config.themes);
    const firstTheme = themesArray.shift();
    if (!firstTheme) return {};
    const colors = Object.fromEntries(
      Object.keys(firstTheme).map((colorName) => [
        colorName,
        `var(--${colorName})`,
      ]),
    );

    return {
      theme: {
        extend: {
          colors,
        },
      },
    };
  },
);
