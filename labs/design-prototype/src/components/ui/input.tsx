import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral dark:border-neutral-off-dark bg-neutral dark:bg-neutral-dark px-3 py-2 text-base ring-offset-neutral dark:ring-offset-neutral-dark file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-dark dark:file:text-neutral placeholder:text-neutral-off-dark dark:placeholder:text-neutral-off focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
