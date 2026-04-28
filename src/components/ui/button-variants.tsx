import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const govButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-gov-green text-gov-green-foreground hover:bg-gov-green-hover shadow-md hover:shadow-lg",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border shadow-sm",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GovButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof govButtonVariants> {}

export const GovButton = React.forwardRef<HTMLButtonElement, GovButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(govButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GovButton.displayName = "GovButton";
