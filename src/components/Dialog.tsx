import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type WithChildren<T extends object = object> = T & {
  children: ReactNode;
};

const DialogContent = ({
  children,
  showXButton = false,
  ...props
}: RadixDialog.DialogContentProps & { showXButton?: boolean }) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-base/80 backdrop-blur-sm" />
      <RadixDialog.Content
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-base p-6 shadow-lg duration-200 sm:rounded-lg md:w-full"
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
};

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

const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
};

export default Dialog;
