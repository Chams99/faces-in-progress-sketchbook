import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'image' | 'text' | 'avatar';
  lines?: number;
}

function Skeleton({
  className,
  variant = 'default',
  lines = 1,
  ...props
}: SkeletonProps) {
  if (variant === 'image') {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
          "animate-pulse",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse",
              i === lines - 1 ? "w-3/4" : "w-full",
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div
        className={cn(
          "rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-pulse",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  );
}

export { Skeleton }
