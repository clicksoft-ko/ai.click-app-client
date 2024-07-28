import { cn } from "@/shared/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  errorMessages?: string[];
  wrapperClassName?: string;
  startComponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      errorMessages,
      className,
      wrapperClassName,
      type,
      startComponent,
      ...props
    },
    ref,
  ) => {
    errorMessage = errorMessage || errorMessages?.join("\n");
    const errorStyles = cn(errorMessage && "text-error");

    return (
      <label className={cn("flex flex-col gap-1", wrapperClassName)}>
        {label && <span>{label}</span>}
        <label
          className={cn(
            "flex h-10 w-full items-center overflow-hidden rounded-md bg-background text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            "border border-primary/30 focus-within:border-primary",
            errorMessage ? "border-error" : "",
            className,
          )}
        >
          {startComponent}
          <input
            className="h-full w-full px-3 py-2 text-base"
            spellCheck="false"
            style={{ imeMode: "active" }}
            type={type}
            ref={ref}
            {...props}
          />
        </label>
        {errorMessage && (
          <div className={cn("pl-1 text-sm", errorStyles)}>{errorMessage}</div>
        )}
      </label>
    );
  },
);
Input.displayName = "Input";

export { Input };
