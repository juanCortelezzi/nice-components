import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type ReactNode,
} from "react";

type WithChildren<T extends object = object> = T & {
  children: ReactNode;
};

const Dialog = RadixDialog.Root;
const DialogTrigger = RadixDialog.Trigger;

const DialogCloseButton = RadixDialog.Close;

const DialogContent = forwardRef<
  ElementRef<typeof RadixDialog.Content>,
  ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
    showXButton: boolean;
  }
>(({ children, showXButton, ...props }, ref) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-base/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <RadixDialog.Content
        ref={ref}
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-base p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
        {...props}
      >
        {children}
        {showXButton && (
          <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-pink-500 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-red-500 data-[state=open]:text-blue-500">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
DialogContent.displayName = RadixDialog.Content.displayName;

const DialogHeader = ({ children }: WithChildren) => {
  return (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
      {children}
    </div>
  );
};

const DialogTitle = ({ children }: WithChildren) => {
  return (
    <RadixDialog.Title className="text-lg font-semibold leading-none tracking-tight">
      {children}
    </RadixDialog.Title>
  );
};

const DialogDescription = ({ children }: WithChildren) => {
  return (
    <RadixDialog.Description className="text-sm text-text/70">
      {children}
    </RadixDialog.Description>
  );
};

const DialogFooter = ({ children }: WithChildren) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      {children}
    </div>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCloseButton,
};
