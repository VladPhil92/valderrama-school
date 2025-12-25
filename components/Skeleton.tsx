interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-slate-200 dark:bg-slate-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined),
  };

  if (lines > 1 && variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              ...style,
              width: i === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Image skeleton with aspect ratio
export function ImageSkeleton({ 
  className = '', 
  aspectRatio = '16/9' 
}: { 
  className?: string; 
  aspectRatio?: string;
}) {
  return (
    <div 
      className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-md ${className}`}
      style={{ aspectRatio }}
    />
  );
}

// Card skeleton for content cards
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 border border-slate-200 dark:border-slate-700 rounded-md ${className}`}>
      <Skeleton variant="circular" width={48} height={48} className="mb-4" />
      <Skeleton variant="text" height={24} className="mb-2" width="60%" />
      <Skeleton variant="text" lines={3} height={16} />
    </div>
  );
}
