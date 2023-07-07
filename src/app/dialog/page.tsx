"use client";

import React, { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@/components/button";
import {
  errorMessageVariants,
  inputVariants,
  labelVariants,
} from "@/components/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.output<typeof resolver>;
type Inputs = z.input<typeof resolver>;
const resolver = z.object({
  name: z
    .string()
    .nonempty("you must have a name!")
    .max(100, { message: "longer than 100 is sus!" }),
  username: z
    .string()
    .nonempty("C'mon no username?")
    .max(100, { message: "longer than 100 is sus!" }),
});

function UserDialog({
  open,
  data,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: { name: string; username: string };
}) {
  const defaultValues = useMemo(
    () => ({
      name: data.name,
      username: data.username,
    }),
    [data]
  ) satisfies Inputs;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs, unknown, FormData>({
    resolver: zodResolver(resolver),
    defaultValues,
  });

  // Reset when props change
  useEffect(() => reset(defaultValues), [reset, defaultValues]);

  // Reset form after successful submit
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      {/* <Dialog.Trigger asChild> */}
      {/*   <button className={buttonVariants()}>Edit profile</button> */}
      {/* </Dialog.Trigger> */}

      <DialogContent showXButton={false}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(`submitted with: "${data.name}" - "${data.username}"`);
          })}
        >
          <div className="grid gap-4 py-4">
            <fieldset className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="name"
                className={labelVariants({ className: "text-right" })}
              >
                Name
              </label>
              <input
                id="name"
                className={inputVariants({ className: "col-span-3" })}
                {...register("name")}
              />
              {errors.name && (
                <span
                  className={errorMessageVariants({
                    className: "col-span-3 col-start-2",
                  })}
                >
                  {errors.name.message}
                </span>
              )}
            </fieldset>
            <fieldset className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="username"
                className={labelVariants({ className: "text-right" })}
              >
                Username
              </label>
              <input
                id="username"
                className={inputVariants({ className: "col-span-3" })}
                {...register("username")}
              />
              {errors.username && (
                <span
                  className={errorMessageVariants({
                    className: "col-span-3 col-start-2",
                  })}
                >
                  {errors.username.message}
                </span>
              )}
            </fieldset>
          </div>

          <DialogFooter>
            <button
              type="button"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" className={buttonVariants()}>
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function TestingPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("juanba");
  const [username, setUsername] = useState("wiz");

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="col-span-2 flex flex-col items-start justify-center">
          <span>Name: {name}</span>
          <span>Username: {username}</span>
        </div>
        <button
          className={buttonVariants({ variant: "outline" })}
          onClick={() => {
            setName("juan");
            setUsername("wiz");
          }}
        >
          Juan
        </button>
        <button
          className={buttonVariants({ variant: "secondary" })}
          onClick={() => {
            setName("tomas");
            setUsername("chino");
          }}
        >
          Tomas
        </button>
      </div>
      <div className="my-8" />

      <button className={buttonVariants()} onClick={() => setOpen(true)}>
        Edit profile
      </button>
      <UserDialog
        open={open}
        onOpenChange={setOpen}
        data={{ name, username }}
      />
    </>
  );
}
