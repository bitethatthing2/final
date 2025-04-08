/**
 * Google Reviews Widget Fix
 * This script provides a browser-compatible polyfill for the require() function
 * to fix the "require is not defined" error in the Elfsight Google Reviews widget
 */

(function() {
  // Only add the polyfill if require isn't already defined
  if (typeof window.require === 'undefined') {
    // Create a simple module cache
    const moduleCache = {};
    
    // Define common modules that might be required
    moduleCache['@emotion/is-prop-valid'] = {
      default: function(prop) {
        // Simple implementation that allows most props
        const invalidProps = [
          'children', 'dangerouslySetInnerHTML', 'suppressContentEditableWarning', 
          'suppressHydrationWarning', 'defaultValue', 'defaultChecked', 'innerHTML', 
          'style'
        ];
        return !invalidProps.includes(prop);
      }
    };
    
    // Create a simple require function that returns cached modules
    window.require = function(moduleName) {
      if (moduleCache[moduleName]) {
        return moduleCache[moduleName].default || moduleCache[moduleName];
      }
      
      console.warn(`Module "${moduleName}" was required but not found in the polyfill cache`);
      
      // Return a dummy object to prevent further errors
      return {};
    };
    
    console.log('Added require() polyfill for browser compatibility');
  }
})();
