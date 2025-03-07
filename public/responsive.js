// Simple responsive script that runs only in the browser
(function() {
  // Only run in browser
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // Function to apply responsive adjustments
  function applyResponsiveAdjustments() {
    // Set viewport height variable for iOS Safari
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Get current width
    const width = window.innerWidth;
    
    // Add device class to body
    const body = document.body;
    if (!body) return;
    
    body.classList.remove('device-mobile', 'device-tablet', 'device-desktop', 'device-large-desktop');
    
    if (width < 768) {
      body.classList.add('device-mobile');
      
      // Mobile-specific adjustments
      body.style.overflowX = 'hidden';
      document.querySelectorAll('.container, .container-fluid').forEach(function(el) {
        if (el) {
          el.style.maxWidth = '100vw';
          el.style.overflowX = 'hidden';
        }
      });
      
      // Make touch targets larger
      document.querySelectorAll('a, button, .btn, input[type="button"], input[type="submit"]').forEach(function(el) {
        if (el) {
          el.style.minHeight = '44px';
          el.style.minWidth = '44px';
        }
      });
    } else if (width < 992) {
      body.classList.add('device-tablet');
    } else if (width < 1200) {
      body.classList.add('device-desktop');
    } else {
      body.classList.add('device-large-desktop');
    }
  }
  
  // Apply on page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(applyResponsiveAdjustments, 1);
  } else {
    document.addEventListener('DOMContentLoaded', applyResponsiveAdjustments);
  }
  
  // Apply on resize
  window.addEventListener('resize', applyResponsiveAdjustments);
  
  // Apply on orientation change
  window.addEventListener('orientationchange', applyResponsiveAdjustments);
})(); 