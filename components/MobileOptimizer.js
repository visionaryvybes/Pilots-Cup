import { useEffect } from 'react';

const ResponsiveOptimizer = () => {
  useEffect(() => {
    // Function to handle viewport adjustments for all device types
    const handleViewport = () => {
      // Fix for iOS Safari viewport height issues
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Determine device type
      const width = window.innerWidth;
      let deviceType = 'mobile';
      
      if (width >= 1200) {
        deviceType = 'large-desktop';
      } else if (width >= 992) {
        deviceType = 'desktop';
      } else if (width >= 768) {
        deviceType = 'tablet';
      }
      
      // Add device type class to body for CSS targeting
      document.body.classList.remove('device-mobile', 'device-tablet', 'device-desktop', 'device-large-desktop');
      document.body.classList.add(`device-${deviceType}`);
      
      // Apply device-specific adjustments
      if (deviceType === 'mobile') {
        // Mobile-specific adjustments
        
        // Fix for mobile scrolling issues
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        
        // Fix for fixed elements on mobile
        const fixedElements = document.querySelectorAll('.fixed-top, .fixed-bottom, .sticky-top');
        fixedElements.forEach(el => {
          el.style.position = 'relative';
        });
        
        // Fix for horizontal overflow
        const containers = document.querySelectorAll('.container, .container-fluid');
        containers.forEach(container => {
          container.style.maxWidth = '100vw';
          container.style.overflowX = 'hidden';
        });
        
        // Adjust font sizes for better readability on mobile
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          const currentSize = window.getComputedStyle(heading).fontSize;
          const currentSizeNum = parseFloat(currentSize);
          if (heading.tagName === 'H1' && currentSizeNum > 32) {
            heading.style.fontSize = '32px';
          } else if (heading.tagName === 'H2' && currentSizeNum > 28) {
            heading.style.fontSize = '28px';
          } else if (heading.tagName === 'H3' && currentSizeNum > 24) {
            heading.style.fontSize = '24px';
          }
        });
        
        // Ensure buttons are large enough for touch targets
        const touchTargets = document.querySelectorAll('a, button, .btn, input[type="button"], input[type="submit"]');
        touchTargets.forEach(target => {
          const height = parseFloat(window.getComputedStyle(target).height);
          if (height < 44) {
            target.style.minHeight = '44px';
          }
          
          const width = parseFloat(window.getComputedStyle(target).width);
          if (width < 44) {
            target.style.minWidth = '44px';
          }
        });
      } else {
        // Reset styles for larger screens
        const fixedElements = document.querySelectorAll('.fixed-top, .fixed-bottom, .sticky-top');
        fixedElements.forEach(el => {
          el.style.position = '';
        });
        
        // Reset font sizes for larger screens if they were manually set
        const headings = document.querySelectorAll('h1[style*="font-size"], h2[style*="font-size"], h3[style*="font-size"], h4[style*="font-size"], h5[style*="font-size"], h6[style*="font-size"]');
        headings.forEach(heading => {
          heading.style.fontSize = '';
        });
      }
      
      // Handle navigation menu for different devices
      const navToggler = document.querySelector('.navbar-toggler');
      const navCollapse = document.querySelector('.navbar-collapse');
      
      if (navToggler && navCollapse) {
        if (deviceType === 'mobile') {
          // Set up mobile navigation
          navToggler.style.display = 'block';
          navCollapse.style.display = 'none';
          
          // Add click event to toggle navigation
          if (!navToggler.hasAttribute('data-event-attached')) {
            navToggler.setAttribute('data-event-attached', 'true');
            navToggler.addEventListener('click', () => {
              if (navCollapse.style.display === 'none') {
                navCollapse.style.display = 'block';
              } else {
                navCollapse.style.display = 'none';
              }
            });
          }
        } else {
          // Set up desktop/tablet navigation
          navToggler.style.display = 'none';
          navCollapse.style.display = 'block';
        }
      }
    };
    
    // Run on mount
    handleViewport();
    
    // Add event listeners
    window.addEventListener('resize', handleViewport);
    window.addEventListener('orientationchange', handleViewport);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleViewport);
      window.removeEventListener('orientationchange', handleViewport);
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default ResponsiveOptimizer; 