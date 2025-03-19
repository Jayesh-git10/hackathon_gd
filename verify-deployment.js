const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}=== Athlete Diet Planner Deployment Verification ===${colors.reset}\n`);

// Array to hold verification results
const results = [];

// Function to add a verification result
function addResult(name, success, message) {
  results.push({ name, success, message });
  const icon = success ? '✅' : '❌';
  const color = success ? colors.green : colors.red;
  console.log(`${icon} ${color}${name}${colors.reset}: ${message}`);
}

// Check if Next.js is installed
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const hasNextJs = packageJson.dependencies && packageJson.dependencies.next;
  addResult(
    'Next.js Dependency',
    hasNextJs,
    hasNextJs ? `Found Next.js ${packageJson.dependencies.next}` : 'Next.js not found in dependencies'
  );
} catch (error) {
  addResult('Next.js Dependency', false, 'Could not read package.json');
}

// Check if .env.local exists
const hasEnvFile = fs.existsSync('./.env.local');
addResult(
  'Environment Variables',
  hasEnvFile,
  hasEnvFile ? '.env.local file found' : '.env.local file not found. API keys might not work.'
);

// Check if Google Places API key is set (without exposing the actual key)
if (hasEnvFile) {
  const envContent = fs.readFileSync('./.env.local', 'utf8');
  const hasGooglePlacesKey = envContent.includes('GOOGLE_PLACES_API_KEY=');
  const hasGoogleMapsKey = envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=');
  
  // Check if keys are placeholder values
  const placesKeyIsPlaceholder = envContent.includes('GOOGLE_PLACES_API_KEY=YOUR_');
  const mapsKeyIsPlaceholder = envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_');
  
  addResult(
    'Google Places API Key',
    hasGooglePlacesKey && !placesKeyIsPlaceholder,
    hasGooglePlacesKey 
      ? placesKeyIsPlaceholder 
        ? 'Google Places API key is set but appears to be a placeholder' 
        : 'Google Places API key is set'
      : 'Google Places API key not found in .env.local'
  );
  
  addResult(
    'Google Maps API Key',
    hasGoogleMapsKey && !mapsKeyIsPlaceholder,
    hasGoogleMapsKey 
      ? mapsKeyIsPlaceholder 
        ? 'Google Maps API key is set but appears to be a placeholder' 
        : 'Google Maps API key is set'
      : 'Google Maps API key not found in .env.local'
  );
}

// Check if .env.local is in .gitignore
let isEnvInGitignore = false;
if (fs.existsSync('./.gitignore')) {
  const gitignoreContent = fs.readFileSync('./.gitignore', 'utf8');
  isEnvInGitignore = gitignoreContent.includes('.env.local') || gitignoreContent.includes('.env*.local');
}

addResult(
  'API Key Security',
  isEnvInGitignore,
  isEnvInGitignore 
    ? '.env.local is properly ignored by git' 
    : 'WARNING: .env.local is not in .gitignore! Your API keys could be leaked.'
);

// Check if build directory exists
const hasBuildDir = fs.existsSync('./.next');
addResult(
  'Build Directory',
  hasBuildDir,
  hasBuildDir ? '.next directory found' : '.next directory not found. Run npm run build first.'
);

// Check if public directory has images
const hasPublicImagesDir = fs.existsSync('./public/images');
let imageCount = 0;
if (hasPublicImagesDir) {
  try {
    imageCount = fs.readdirSync('./public/images').filter(file => 
      ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'].some(ext => file.toLowerCase().endsWith(ext))
    ).length;
  } catch (e) {
    console.error('Error reading images directory', e);
  }
}

addResult(
  'Static Images',
  imageCount > 0,
  imageCount > 0 ? `Found ${imageCount} images in public/images` : 'No images found in public/images'
);

// Try to build the project
let buildSuccess = false;
try {
  console.log(`\n${colors.yellow}Attempting to build the project...${colors.reset}`);
  execSync('npm run build', { stdio: 'inherit' });
  buildSuccess = true;
} catch (error) {
  console.error(`\n${colors.red}Build failed${colors.reset}`);
  buildSuccess = false;
}

addResult(
  'Project Build',
  buildSuccess,
  buildSuccess ? 'Project builds successfully' : 'Project build failed'
);

// Summary
console.log(`\n${colors.bright}${colors.cyan}Deployment Verification Summary${colors.reset}`);
const successCount = results.filter(r => r.success).length;
const failureCount = results.length - successCount;

if (failureCount === 0) {
  console.log(`\n${colors.bright}${colors.green}✅ All checks passed! Your project is ready for deployment.${colors.reset}`);
  console.log(`\nTo deploy, run: ${colors.yellow}node deploy.js${colors.reset}`);
} else {
  console.log(`\n${colors.bright}${colors.yellow}⚠️ ${failureCount} check(s) failed. Please fix the issues before deploying.${colors.reset}`);
  
  console.log(`\n${colors.red}Failed checks:${colors.reset}`);
  results.filter(r => !r.success).forEach(result => {
    console.log(`❌ ${result.name}: ${result.message}`);
  });
  
  console.log(`\nSee the ${colors.cyan}DEPLOYMENT.md${colors.reset} file for troubleshooting information.`);
}

// Security tips
console.log(`\n${colors.bright}${colors.yellow}API Key Security Tips:${colors.reset}`);
console.log(`1. Never commit API keys to your repository`);
console.log(`2. Set up API key restrictions in Google Cloud Console`);
console.log(`3. Use environment variables on deployment platforms`);
console.log(`4. Monitor API usage regularly`);

// Check Node.js and npm versions
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  
  console.log(`\n${colors.bright}System Information:${colors.reset}`);
  console.log(`Node.js: ${nodeVersion}`);
  console.log(`npm: ${npmVersion}`);
} catch (error) {
  console.error('Could not determine Node.js or npm version');
} 