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
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;
    
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
  
  // Calculate responsive flags - default to mobile during SSR
  const isMobile = !isClient || (screenWidth >= breakpoints.mobile && screenWidth < breakpoints.tablet);
  const isTablet = isClient && screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop;
  const isDesktop = isClient && screenWidth >= breakpoints.desktop && screenWidth < breakpoints.largeDesktop;
  const isLargeDesktop = isClient && screenWidth >= breakpoints.largeDesktop;
  
  // Determine current device type - default to mobile during SSR
  let deviceType = 'mobile'; // Default to mobile for SSR
  if (isClient) {
    if (screenWidth >= breakpoints.largeDesktop) deviceType = 'largeDesktop';
    else if (screenWidth >= breakpoints.desktop) deviceType = 'desktop';
    else if (screenWidth >= breakpoints.tablet) deviceType = 'tablet';
  }
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    screenWidth: isClient ? screenWidth : 0,
    deviceType,
    isClient
  };
};

export default useResponsive; 