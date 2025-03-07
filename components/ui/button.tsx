'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-red-500 text-white hover:bg-red-600',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-white/20 bg-transparent hover:bg-white/10',
        secondary: 'bg-white/10 text-white hover:bg-white/20',
        ghost: 'hover:bg-white/10',
        link: 'text-white underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

// ButtonLink component for when you need a link that looks like a button
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  href: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';
  
  const variantStyles = {
    default: 'bg-[var(--color-red-600)] text-white hover:bg-[var(--color-red-700)] focus-visible:ring-[var(--color-red-500)]',
    outline: 'border border-[var(--color-neutral-200)] bg-transparent hover:bg-[var(--color-neutral-100)] focus-visible:ring-[var(--color-neutral-500)]',
    ghost: 'bg-transparent hover:bg-[var(--color-neutral-100)] focus-visible:ring-[var(--color-neutral-500)]',
  };
  
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-6 text-lg',
  };
  
  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}; 