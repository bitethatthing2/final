/**
 * Simple require polyfill for browser
 * This intercepts require() calls and provides a browser-compatible alternative
 * to prevent "require is not defined" errors from animation libraries
 */
(function() {
  if (typeof window !== 'undefined' && typeof window.require === 'undefined') {
    window.require = function(moduleName) {
      console.warn('Browser require() polyfill called for:', moduleName);
      // Return empty objects/functions for common requires
      if (moduleName === '@emotion/is-prop-valid') {
        return function() { return true; };
      }
      return {};
    };
    console.log('Browser require() polyfill installed');
  }
})();
