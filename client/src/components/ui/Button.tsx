import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent text-xs font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#1C1C1E] dark:focus-visible:ring-[#F6F5F0] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#1C1C1E] text-white hover:bg-black dark:bg-[#F6F5F0] dark:text-[#1C1C1E] dark:hover:bg-white shadow-xs active:scale-[0.98]",
        outline:
          "border border-[#E1E1E1] dark:border-[#2C2C30] bg-white dark:bg-[#222225] text-[#1C1C1E] dark:text-[#F6F5F0] hover:bg-[#F4F2EE] dark:hover:bg-[#2C2C30] shadow-xs active:scale-[0.98]",
        secondary:
          "bg-[#E8E7E2] text-[#1C1C1E] hover:bg-[#DDDCD7] dark:bg-[#2C2C30] dark:text-[#F6F5F0] dark:hover:bg-[#38383D]",
        ghost:
          "text-[#4C586F] hover:bg-[#E8E7E2]/60 hover:text-[#1C1C1E] dark:text-[#A0A9B8] dark:hover:bg-[#222225] dark:hover:text-[#F6F5F0]",
        destructive:
          "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20",
        link: "text-[#3B719F] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 gap-2 px-4 py-2 font-medium rounded-xl",
        xs: "h-7 gap-1 rounded-lg px-2.5 text-[11px]",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
        lg: "h-11 gap-2.5 rounded-xl px-6 text-sm",
        icon: "size-9 rounded-xl p-0",
        "icon-sm": "size-7 rounded-lg p-0",
        "icon-lg": "size-11 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
