import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  variants: {
    variant: {
      default: "bg-primary text-primary-forgeground hover:bg-primary/90",
      outline:
        "border border-primary hover:bg-primary/90 hover:text-primary-forgeground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost:
        "hover:bg-primary/10 hover:text-primary-foreground text-text/80 font-medium",
      // link: "underline-offset-4 hover:underline text-primary",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      xl: "h-14 px-10 rounded-md text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
