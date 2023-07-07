"use client";

import { buttonVariants } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogCloseButton,
} from "@/components/dialog";
import { errorMessageVariants, labelVariants } from "@/components/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.output<typeof resolver>;
type FormInput = z.input<typeof resolver>;
const resolver = z.object({
  pet: z.enum(["cat", "dog", "dinosaur"]),
});

export default function FormInDialogPage() {
  const defaultValues = useMemo(
    () => ({
      pet: "cat",
    }),
    []
  ) satisfies FormInput;

  const {
    // register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(resolver),
    defaultValues,
  });

  // Reset form after successful submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Dialog modal>
        <DialogTrigger asChild>
          <button className={buttonVariants()}>Make Pet</button>
        </DialogTrigger>

        <DialogContent showXButton={false}>
          <DialogHeader>
            <DialogTitle>Make a pet</DialogTitle>
            <DialogDescription>
              Describe your best pet here, you might get it some time!
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit((data) => {
              console.log(`submitted with: "${data.pet}"`);
            })}
          >
            <div className="grid gap-4 py-4">
              <fieldset className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="username"
                  className={labelVariants({ className: "text-right" })}
                >
                  Username
                </label>
                <Controller
                  name="pet"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(v) =>
                        field.onChange(v as FormInput["pet"])
                      }
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="dinosaur">Dinosaur</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.pet && (
                  <span
                    className={errorMessageVariants({
                      className: "col-span-3 col-start-2",
                    })}
                  >
                    {errors.pet.message}
                  </span>
                )}
              </fieldset>
            </div>

            <DialogFooter>
              <DialogCloseButton
                type="button"
                className={buttonVariants({ variant: "outline" })}
                onClick={() => reset()}
              >
                Cancel
              </DialogCloseButton>
              <button type="submit" className={buttonVariants()}>
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
