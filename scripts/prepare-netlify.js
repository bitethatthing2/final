// Script to prepare assets for Netlify deployment
const fs = require('fs-extra');
const path = require('path');

async function main() {
  try {
    console.log('Starting asset preparation for Netlify deployment...');
    
    // Step 1: Ensure out directory exists
    await fs.ensureDir('out');
    console.log('Ensured out directory exists');
    
    // Step 2: Copy the public directory to out directory
    console.log('Copying public assets to out...');
    await fs.copy('public', 'out', {
      filter: (src) => {
        const basename = path.basename(src);
        return !basename.startsWith('.'); // Skip hidden files
      },
      overwrite: true
    });
    
    console.log('Successfully copied public assets');
    
    // Step 3: Create _redirects file for client-side routing
    const redirectsContent = '/* /index.html 200';
    await fs.writeFile('out/_redirects', redirectsContent);
    console.log('Created _redirects file');
    
  } catch (error) {
    console.error('Error preparing assets:', error);
    process.exit(1);
  }
}

main();
