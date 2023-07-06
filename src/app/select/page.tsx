"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { buttonVariants } from "@/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

type FormData = z.output<typeof resolver>;
type Inputs = z.input<typeof resolver>;
const resolver = z.object({
  theme: z.enum(["light", "dark", "system"]),
});

export default function SelectPage() {
  const defaultValues = useMemo(
    () => ({
      theme: "system",
    }),
    []
  ) satisfies Inputs;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs, unknown, FormData>({
    resolver: zodResolver(resolver),
    defaultValues,
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          name="theme"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(v) => field.onChange(v as Inputs["theme"])}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-96">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          )}
        ></Controller>
        <button type="submit" className={buttonVariants({ className: "mt-8" })}>
          Sumbittear
        </button>
      </form>
    </main>
  );
}
