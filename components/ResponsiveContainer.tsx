'use client';

import { ReactNode } from 'react';
import useResponsive from '../hooks/useResponsive';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  largeDesktopClassName?: string;
}

/**
 * A responsive container component that applies different classes based on the device type
 * 
 * Usage:
 * <ResponsiveContainer
 *   mobileClassName="px-4 py-2"
 *   tabletClassName="px-6 py-4"
 *   desktopClassName="px-8 py-6"
 *   largeDesktopClassName="px-12 py-8"
 * >
 *   Your content here
 * </ResponsiveContainer>
 */
const ResponsiveContainer = ({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
  largeDesktopClassName = '',
}: ResponsiveContainerProps) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useResponsive();
  
  // Determine which class to apply based on the device type
  let responsiveClass = className;
  
  if (isMobile && mobileClassName) {
    responsiveClass += ` ${mobileClassName}`;
  } else if (isTablet && tabletClassName) {
    responsiveClass += ` ${tabletClassName}`;
  } else if (isDesktop && desktopClassName) {
    responsiveClass += ` ${desktopClassName}`;
  } else if (isLargeDesktop && largeDesktopClassName) {
    responsiveClass += ` ${largeDesktopClassName}`;
  }
  
  return <div className={responsiveClass}>{children}</div>;
};

export default ResponsiveContainer; 