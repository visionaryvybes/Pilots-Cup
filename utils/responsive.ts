/**
 * Responsive utility functions
 */

// Breakpoints that match our CSS media queries
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 992,
  largeDesktop: 1200
};

/**
 * Checks if the current device is mobile
 * @param width - The current screen width
 * @returns boolean
 */
export const isMobile = (width: number): boolean => {
  return width >= breakpoints.mobile && width < breakpoints.tablet;
};

/**
 * Checks if the current device is a tablet
 * @param width - The current screen width
 * @returns boolean
 */
export const isTablet = (width: number): boolean => {
  return width >= breakpoints.tablet && width < breakpoints.desktop;
};

/**
 * Checks if the current device is a desktop
 * @param width - The current screen width
 * @returns boolean
 */
export const isDesktop = (width: number): boolean => {
  return width >= breakpoints.desktop && width < breakpoints.largeDesktop;
};

/**
 * Checks if the current device is a large desktop
 * @param width - The current screen width
 * @returns boolean
 */
export const isLargeDesktop = (width: number): boolean => {
  return width >= breakpoints.largeDesktop;
};

/**
 * Gets the device type based on the screen width
 * @param width - The current screen width
 * @returns 'mobile' | 'tablet' | 'desktop' | 'largeDesktop'
 */
export const getDeviceType = (width: number): 'mobile' | 'tablet' | 'desktop' | 'largeDesktop' => {
  if (isLargeDesktop(width)) return 'largeDesktop';
  if (isDesktop(width)) return 'desktop';
  if (isTablet(width)) return 'tablet';
  return 'mobile';
};

/**
 * Gets the appropriate value for the current device type
 * @param options - Object with values for each device type
 * @param width - The current screen width
 * @returns The value for the current device type
 */
export const getResponsiveValue = <T>(
  options: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    largeDesktop?: T;
    default: T;
  },
  width: number
): T => {
  const deviceType = getDeviceType(width);
  
  if (deviceType === 'largeDesktop' && options.largeDesktop !== undefined) {
    return options.largeDesktop;
  }
  
  if (deviceType === 'desktop' && options.desktop !== undefined) {
    return options.desktop;
  }
  
  if (deviceType === 'tablet' && options.tablet !== undefined) {
    return options.tablet;
  }
  
  if (deviceType === 'mobile' && options.mobile !== undefined) {
    return options.mobile;
  }
  
  return options.default;
}; 