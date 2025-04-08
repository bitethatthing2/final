/**
 * Google Maps Embed Fix
 * This script helps ensure Google Maps embeds work properly in production environments
 * by addressing common iframe loading issues.
 */

(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Find all Google Maps iframes
    const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
    
    // Process each iframe
    mapIframes.forEach(iframe => {
      // Ensure proper loading attribute
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
      
      // Ensure proper referrer policy
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      
      // Add event listeners to detect loading issues
      iframe.addEventListener('load', function() {
        console.log('Google Maps iframe loaded successfully');
      });
      
      iframe.addEventListener('error', function(e) {
        console.error('Error loading Google Maps iframe:', e);
        // Attempt to reload the iframe if it fails
        setTimeout(() => {
          const originalSrc = iframe.src;
          iframe.src = '';
          setTimeout(() => {
            iframe.src = originalSrc;
          }, 100);
        }, 1000);
      });
    });
  });
})();
