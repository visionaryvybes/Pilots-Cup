import { useState, useEffect } from 'react';

// Breakpoints that match our CSS media queries
const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200
};

/**
 * A hook that provides responsive information
 * 
 * Usage:
 * const { isMobile, isTablet, isDesktop, isLargeDesktop, screenWidth } = useResponsive();
 * 
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 */
const useResponsive = () => {
  // Initialize with sensible defaults for SSR
  const [screenWidth, setScreenWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Mark that we're in the client
    setIsClient(true);
    
    // Set initial width
    setScreenWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate responsive flags
  const isMobile = isClient && screenWidth >= breakpoints.mobile && screenWidth < breakpoints.tablet;
  const isTablet = isClient && screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop;
  const isDesktop = isClient && screenWidth >= breakpoints.desktop && screenWidth < breakpoints.largeDesktop;
  const isLargeDesktop = isClient && screenWidth >= breakpoints.largeDesktop;
  
  // Determine current device type
  let deviceType = 'unknown';
  if (isClient) {
    if (isMobile) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';
    else if (isDesktop) deviceType = 'desktop';
    else if (isLargeDesktop) deviceType = 'largeDesktop';
  }
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    screenWidth: isClient ? screenWidth : null,
    deviceType,
    isClient
  };
};

export default useResponsive; 