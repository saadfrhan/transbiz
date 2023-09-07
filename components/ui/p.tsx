import { cn } from "@/lib/utils";

export function P(
	{children, className}: {children: React.ReactNode, className?: string}
) {
  return (
    <p className={cn("leading-7 font-dm-sans [&:not(:first-child)]:mt-2", className)}>
      {children}
    </p>
  )
}