import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-amber-500 text-white",
    error: "bg-red-500 text-white"
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-sm font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
