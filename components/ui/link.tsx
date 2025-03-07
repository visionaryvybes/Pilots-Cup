import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  children: React.ReactNode;
}

export function Link({
  href,
  prefetch = true,
  className,
  activeClassName,
  exact = false,
  children,
  ...props
}: LinkProps) {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname?.startsWith(href) && href !== '/';

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export function NavLink({
  className,
  activeClassName = 'text-primary',
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(
        'text-gray-400 hover:text-white transition-colors',
        className
      )}
      activeClassName={activeClassName}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        className
      )}
      {...props}
    />
  );
} 