import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'default',
  animate = true,
  ...props
}: SkeletonProps) {
  const baseClasses = 'bg-gray-800/50 rounded-md';
  const animationClasses = animate ? 'animate-pulse' : '';

  const variantClasses = {
    default: 'h-4 w-full',
    card: 'h-[300px] w-full',
    text: 'h-4 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24',
  };

  return (
    <div
      className={cn(
        baseClasses,
        animationClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-800 bg-black p-6 space-y-4">
      <Skeleton variant="avatar" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton className="w-1/2" />
      </div>
      <Skeleton variant="button" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-w-4 aspect-h-3">
          <Skeleton variant="card" className="rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4">
      <Skeleton variant="avatar" className="h-10 w-10" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" />
        <Skeleton className="w-1/2" />
      </div>
      <Skeleton variant="button" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton variant="button" className="w-full" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-screen">
        <Skeleton className="h-16 w-3/4 md:w-1/2 mb-6" />
        <Skeleton className="h-8 w-2/3 md:w-1/3 mb-4" />
        <Skeleton className="h-6 w-1/2 md:w-1/4 mb-8" />
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton variant="button" className="w-40" />
          <Skeleton variant="button" className="w-40" />
        </div>
      </div>
    </div>
  );
}

export function NavSkeleton() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="button" className="w-20" />
            ))}
          </div>
          <Skeleton variant="button" className="w-24" />
        </div>
      </div>
    </div>
  );
} 