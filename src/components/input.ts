import { tv } from "tailwind-variants";

export const inputVariants = tv({
  base: "flex h-10 w-full rounded-md border border-input bg-base px-3 py-2 text-sm ring-offset-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
});

export const labelVariants = tv({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export const errorMessageVariants = tv({
  base: "text-[0.8rem] font-medium text-red-500",
});
