/**
 * Framer Motion Timing Fix
 * 
 * This script specifically addresses the error:
 * "let r = l.useManualTiming ? n.timestamp : performance.now()"
 * 
 * This occurs when Framer Motion tries to use its internal timing mechanism
 * and encounters problems with the performance.now() API in certain browsers
 * or when the performance API is polyfilled incorrectly.
 */
(function() {
  console.log('Framer Motion timing fix initializing...');
  
  // Safety check to avoid running multiple times
  if (window.__framerTimingFixApplied) {
    return;
  }
  window.__framerTimingFixApplied = true;
  
  // Store original performance.now for safety
  const originalPerformanceNow = 
    (window.performance && typeof window.performance.now === 'function') 
    ? window.performance.now.bind(window.performance) 
    : function() { return Date.now(); };
  
  // Ensure window.performance exists
  if (!window.performance) {
    window.performance = {};
  }
  
  // Provide a robust performance.now implementation
  window.performance.now = function() {
    try {
      return originalPerformanceNow();
    } catch (e) {
      return Date.now();
    }
  };
  
  // Create global object for Framer's internal use
  window.l = window.l || {};
  window.n = window.n || {};
  window.n.timestamp = window.n.timestamp || Date.now();
  
  // Directly fix the useManualTiming function that's causing the error
  window.l.useManualTiming = function(timestamp) {
    return timestamp || window.n.timestamp || Date.now();
  };
  
  // Make sure the useManualTiming property can't be accidentally overwritten
  Object.defineProperty(window.l, 'useManualTiming', {
    get: function() {
      return function(timestamp) {
        return timestamp || window.n.timestamp || Date.now();
      };
    },
    set: function() {
      // Silently ignore attempts to override
      console.warn('Attempt to override l.useManualTiming prevented by framer-timing-fix');
    },
    configurable: false,
    enumerable: true
  });
  
  // Create a MutationObserver to monitor script additions
  // This will apply the fix when Framer Motion scripts are loaded
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.tagName === 'SCRIPT' && 
              node.src && 
              (node.src.includes('framer-motion') || 
               node.src.includes('chunk'))) {
            
            // Wait for script to execute and immediately apply fix
            setTimeout(function() {
              // Reapply our fixes after script loads
              window.l = window.l || {};
              window.n = window.n || {};
              window.n.timestamp = window.n.timestamp || Date.now();
              
              window.l.useManualTiming = function(timestamp) {
                return timestamp || window.n.timestamp || Date.now();
              };
            }, 0);
          }
        });
      }
    });
  });
  
  // Start observing changes to the DOM
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  
  console.log('Framer Motion timing fix applied successfully');
})();
