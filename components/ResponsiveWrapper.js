import { useState, useEffect } from 'react';

// Breakpoints that match our CSS media queries
const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200
};

/**
 * A component that renders different content based on screen size
 * 
 * Usage:
 * <ResponsiveWrapper
 *   mobile={<MobileComponent />}
 *   tablet={<TabletComponent />}
 *   desktop={<DesktopComponent />}
 *   largeDesktop={<LargeDesktopComponent />}
 * />
 * 
 * You can also use it with a render prop:
 * <ResponsiveWrapper>
 *   {({ isMobile, isTablet, isDesktop, isLargeDesktop, screenWidth }) => (
 *     <div>
 *       {isMobile && <MobileComponent />}
 *       {isTablet && <TabletComponent />}
 *       {isDesktop && <DesktopComponent />}
 *       {isLargeDesktop && <LargeDesktopComponent />}
 *       <p>Current screen width: {screenWidth}px</p>
 *     </div>
 *   )}
 * </ResponsiveWrapper>
 */
const ResponsiveWrapper = ({ 
  children, 
  mobile, 
  tablet, 
  desktop, 
  largeDesktop,
  defaultContent = null
}) => {
  // Initialize with a sensible default for SSR
  const [screenWidth, setScreenWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Check if we're in a browser environment
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
  
  // During SSR or hydration, return default content or mobile content
  if (!isClient) {
    return defaultContent || mobile || null;
  }
  
  // Determine which breakpoint we're at
  const isMobile = screenWidth >= breakpoints.mobile && screenWidth < breakpoints.tablet;
  const isTablet = screenWidth >= breakpoints.tablet && screenWidth < breakpoints.desktop;
  const isDesktop = screenWidth >= breakpoints.desktop && screenWidth < breakpoints.largeDesktop;
  const isLargeDesktop = screenWidth >= breakpoints.largeDesktop;
  
  // If children is a function, call it with the current state
  if (typeof children === 'function') {
    return children({
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      screenWidth
    });
  }
  
  // Otherwise, render the appropriate content based on screen size
  if (isMobile && mobile) return mobile;
  if (isTablet && tablet) return tablet;
  if (isDesktop && desktop) return desktop;
  if (isLargeDesktop && largeDesktop) return largeDesktop;
  
  // If no specific content is provided for the current breakpoint,
  // fall back to the smallest specified breakpoint
  if (mobile) return mobile;
  if (tablet) return tablet;
  if (desktop) return desktop;
  if (largeDesktop) return largeDesktop;
  
  // If no content is provided at all, return the default
  return defaultContent;
};

export default ResponsiveWrapper; 