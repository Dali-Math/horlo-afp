import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export function Card({ children, className, hover = true, gradient }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl p-6 border-2 shadow-xl backdrop-blur-sm",
        gradient || "bg-white/10 border-slate-700",
        hover && "hover:scale-105 hover:-translate-y-1 transition-all cursor-pointer",
        className
      )}
      whileHover={hover ? { scale: 1.05, y: -5 } : {}}
    >
      {children}
    </motion.div>
  );
}
