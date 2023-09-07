import { cn } from "@/lib/utils";

export function H2(
	{children, className}: {children: React.ReactNode, className?: string}
) {
  return (
    <h2 className={cn("scroll-m-20 font-dm-sans text-3xl font-semibold tracking-tight transition-colors first:mt-0", className)}>
      {children}
    </h2>
  )
}