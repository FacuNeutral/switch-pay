import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-neutral dark:bg-neutral-off-dark", className)} {...props} />;
}

export { Skeleton };
