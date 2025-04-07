// Script to prepare assets for Netlify deployment
const fs = require('fs-extra');
const path = require('path');

async function main() {
  try {
    console.log('Starting asset preparation for Netlify deployment...');
    
    // Step 1: Ensure out directory exists (Next.js static export goes to 'out')
    await fs.ensureDir('out');
    console.log('Ensured out directory exists');
    
    // Step 2: Create a _redirects file in out directory for SPA routing
    const redirectsPath = path.join('out', '_redirects');
    console.log('Creating _redirects file for SPA routing...');
    // This redirect rule ensures all routes work with client-side navigation
    await fs.writeFile(redirectsPath, '/* /index.html 200');
    console.log('Created _redirects file');
    
    // Step 3: Copy critical files to ensure they're in the out directory
    const criticalFiles = [
      'firebase-messaging-sw.js',
      'manifest.json',
      'favicon.ico'
    ];
    
    for (const file of criticalFiles) {
      const srcPath = path.join('public', file);
      const destPath = path.join('out', file);
      if (await fs.pathExists(srcPath)) {
        console.log(`Copying critical file ${file} to out directory`);
        await fs.copy(srcPath, destPath, { overwrite: true });
      } else {
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
