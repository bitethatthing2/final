/**
 * Elfsight Widget Loader Fix
 * This script helps ensure Elfsight widgets load properly by providing
 * a more robust initialization process and error handling
 */

(function() {
  // Track initialization attempts
  let attempts = 0;
  const MAX_ATTEMPTS = 5;
  
  // Check if Elfsight platform is loaded and initialized
  function checkElfsightPlatform() {
    if (attempts >= MAX_ATTEMPTS) {
      console.warn('Elfsight platform failed to initialize after multiple attempts');
      window.elfsightLoadFailed = true;
      return;
    }
    
    attempts++;
    
    // If platform is already initialized, mark as loaded
    if (window.eapps && window.eapps.Platform && window.eapps.Platform.initialized) {
      window.elfsightLoaded = true;
      console.log('Elfsight platform initialized successfully');
      return;
    }
    
    // Try to initialize from buffer if available
    if (window.eapps && window.eapps.initWidgetsFromBuffer) {
      try {
        window.eapps.initWidgetsFromBuffer();
      } catch (err) {
        console.warn('Error initializing Elfsight widgets from buffer:', err);
      }
    }
    
    // Schedule another check
    setTimeout(checkElfsightPlatform, 500);
  }
  
  // Start checking once the page is loaded
  if (document.readyState === 'complete') {
    checkElfsightPlatform();
  } else {
    window.addEventListener('load', checkElfsightPlatform);
  }
  
  // Also handle the case where the script fails to load
  window.addEventListener('error', function(event) {
    if (event.target && event.target.src && event.target.src.includes('elfsight.com/platform/platform.js')) {
      console.error('Failed to load Elfsight platform script');
      window.elfsightLoadFailed = true;
    }
  }, true);
})();
