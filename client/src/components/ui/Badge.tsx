import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1C1C1E] text-white dark:bg-[#F6F5F0] dark:text-[#1C1C1E]",
        secondary:
          "border-transparent bg-[#E8E7E2] text-[#1C1C1E] dark:bg-[#2C2C30] dark:text-[#F6F5F0]",
        outline:
          "border-[#E1E1E1] dark:border-[#2C2C30] text-[#4C586F] dark:text-[#A0A9B8] bg-white/50 dark:bg-[#222225]/50",
        accent:
          "border-transparent bg-[#3B719F]/15 text-[#3B719F] dark:bg-[#3B719F]/25 dark:text-[#60A5FA] font-semibold",
        pinned:
          "border border-[#E1E1E1] dark:border-[#2C2C30] bg-[#EAE7E2]/90 dark:bg-[#222225] text-[#1C1C1E] dark:text-[#A0A9B8] font-semibold shadow-xs",
        destructive:
          "border-transparent bg-red-500/10 text-red-600 dark:text-red-400 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
