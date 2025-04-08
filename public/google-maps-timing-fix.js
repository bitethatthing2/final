/**
 * Google Maps Timing Fix
 * This script fixes the useManualTiming error that occurs in Google Maps embeds
 * in production environments, especially on Safari and iOS devices.
 */

(function() {
  // Store original performance.now and requestAnimationFrame
  const originalPerformanceNow = window.performance && window.performance.now 
    ? window.performance.now.bind(window.performance) 
    : Date.now.bind(Date);
  
  const originalRAF = window.requestAnimationFrame;
  const originalCAF = window.cancelAnimationFrame;

  // Create a backup timing mechanism
  let timingOffset = Date.now();
  let lastTimestamp = 0;

  // Safe performance.now implementation
  const safePerformanceNow = function() {
    try {
      if (window.performance && window.performance.now) {
        return window.performance.now();
      }
    } catch (e) {
      console.warn('Error accessing performance.now, using fallback', e);
    }
    
    // Fallback to Date.now with offset for consistent timing
    return Date.now() - timingOffset;
  };

  // Patch window.performance.now
  if (window.performance) {
    try {
      window.performance.now = safePerformanceNow;
    } catch (e) {
      console.warn('Could not patch performance.now', e);
    }
  }

  // Create a safe requestAnimationFrame implementation
  const safeRequestAnimationFrame = function(callback) {
    try {
      // Try to use the original first
      if (originalRAF) {
        return originalRAF.call(window, function(timestamp) {
          // If timestamp is invalid, generate our own
          if (isNaN(timestamp) || timestamp === undefined) {
            timestamp = safePerformanceNow();
          }
          
          // Ensure timestamp is always increasing
          if (timestamp < lastTimestamp) {
            timestamp = lastTimestamp + (1000/60); // Approximately 16.67ms
          }
          
          lastTimestamp = timestamp;
          callback(timestamp);
        });
      }
    } catch (e) {
      console.warn('Error using original requestAnimationFrame, using fallback', e);
    }
    
    // Fallback to setTimeout
    return window.setTimeout(function() {
      const timestamp = safePerformanceNow();
      lastTimestamp = timestamp;
      callback(timestamp);
    }, 1000/60);
  };

  // Create a safe cancelAnimationFrame
  const safeCancelAnimationFrame = function(id) {
    try {
      if (originalCAF) {
        return originalCAF.call(window, id);
      }
    } catch (e) {
      console.warn('Error using original cancelAnimationFrame, using fallback', e);
    }
    
    // Fallback to clearTimeout
    return window.clearTimeout(id);
  };

  // Patch requestAnimationFrame and cancelAnimationFrame
  try {
    window.requestAnimationFrame = safeRequestAnimationFrame;
    window.cancelAnimationFrame = safeCancelAnimationFrame;
  } catch (e) {
    console.warn('Could not patch animation frame methods', e);
  }

  // Patch useManualTiming error directly
  // This specifically targets the error in Google Maps
  const patchUseManualTiming = function() {
    try {
      // Check for Google Maps API
      if (window.google && window.google.maps) {
        // If the internal _useManualTiming property exists, ensure it's properly set
        if (window.google.maps.hasOwnProperty('_useManualTiming')) {
          window.google.maps._useManualTiming = false;
        }
        
        // Patch the internal timing function if it exists
        if (typeof window.google.maps.internal === 'object' && 
            window.google.maps.internal.hasOwnProperty('useManualTiming')) {
          window.google.maps.internal.useManualTiming = false;
        }
      }
    } catch (e) {
      console.warn('Error patching useManualTiming', e);
    }
  };

  // Run the patch when Google Maps API loads
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    patchUseManualTiming();
  } else {
    window.addEventListener('load', patchUseManualTiming);
  }

  // Also try to patch when Google Maps script loads
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'SCRIPT' && 
              node.src && 
              node.src.indexOf('maps.googleapis.com') !== -1) {
            // Wait for script to load and execute
            setTimeout(patchUseManualTiming, 500);
          }
        });
      }
    });
  });

  // Start observing
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // Fix iframe loading issues
  const fixIframeLoading = function() {
    const iframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
    
    iframes.forEach(function(iframe) {
      // Ensure proper attributes are set
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
      
      if (!iframe.hasAttribute('referrerpolicy')) {
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      }
      
      // Add sandbox attribute with necessary permissions
      if (!iframe.hasAttribute('sandbox')) {
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
      }
    });
  };

  // Fix iframes when DOM is ready and after any potential dynamic insertions
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fixIframeLoading();
  } else {
    window.addEventListener('DOMContentLoaded', fixIframeLoading);
  }
  
  // Also run periodically to catch dynamically added iframes
  setInterval(fixIframeLoading, 2000);

  console.log('Google Maps timing fix applied');
})();
