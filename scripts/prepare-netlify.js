// Script to prepare assets for Netlify deployment
const fs = require('fs-extra');
const path = require('path');

async function main() {
  try {
    console.log('Starting asset preparation for Netlify deployment...');
    
    // Step 1: Ensure .next directory exists
    await fs.ensureDir('.next');
    console.log('Ensured .next directory exists');
    
    // Step 2: Copy the public directory to .next directory
    console.log('Copying public assets to .next...');
    await fs.copy('public', '.next', {
      filter: (src) => {
        const basename = path.basename(src);
        return !basename.startsWith('.'); // Skip hidden files
      },
      overwrite: true
    });
    
    // Step 3: Create a _redirects file in .next if it doesn't exist
    const redirectsPath = path.join('.next', '_redirects');
    if (!await fs.pathExists(redirectsPath)) {
      console.log('Creating _redirects file for SPA routing...');
      await fs.writeFile(redirectsPath, '/* /.netlify/functions/next 200');
      console.log('Created _redirects file');
    }
    
    // Step 4: Copy critical files to the root of .next
    const criticalFiles = [
      'firebase-messaging-sw.js',
      'manifest.json',
      'favicon.ico',
      '_redirects' // Make sure _redirects is copied
    ];
    
    for (const file of criticalFiles) {
      const srcPath = path.join('public', file);
      const destPath = path.join('.next', file);
      if (await fs.pathExists(srcPath)) {
        console.log(`Copying critical file ${file} to .next`);
        await fs.copy(srcPath, destPath, { overwrite: true });
      } else if (file !== '_redirects') { // We already created _redirects if it didn't exist
        console.warn(`Warning: Critical file ${file} not found in public folder!`);
      }
    }

    console.log('Assets prepared for Netlify deployment!');
  } catch (error) {
    console.error('Error preparing assets:', error);
    process.exit(1);
  }
}

main();
