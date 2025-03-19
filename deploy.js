const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}=== Athlete Diet Planner Deployment Helper ===${colors.reset}\n`);

// Function to execute commands and handle errors
function runCommand(command, errorMessage) {
  try {
    console.log(`${colors.yellow}> ${command}${colors.reset}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`${colors.red}${errorMessage || 'Command failed'}${colors.reset}`);
    console.error(error.message);
    return false;
  }
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for API keys
async function setupEnvironment() {
  return new Promise((resolve) => {
    console.log(`${colors.cyan}Setting up environment variables...${colors.reset}`);
    
    if (fs.existsSync('.env.local')) {
      console.log(`${colors.yellow}Found existing .env.local file.${colors.reset}`);
      
      rl.question(`${colors.yellow}Do you want to update your API keys? (y/n) ${colors.reset}`, (answer) => {
        if (answer.toLowerCase() === 'y') {
          askForApiKeys(resolve);
        } else {
          console.log(`${colors.yellow}Using existing API keys.${colors.reset}`);
          resolve(true);
        }
      });
    } else {
      console.log(`${colors.yellow}No .env.local file found. Creating one...${colors.reset}`);
      askForApiKeys(resolve);
    }
  });
}

function askForApiKeys(resolve) {
  rl.question(`${colors.yellow}Enter your Google Maps API Key (press Enter to use placeholder): ${colors.reset}`, (mapsKey) => {
    rl.question(`${colors.yellow}Enter your Google Places API Key (press Enter to use placeholder): ${colors.reset}`, (placesKey) => {
      const mapsKeyValue = mapsKey || 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
      const placesKeyValue = placesKey || 'YOUR_GOOGLE_PLACES_API_KEY_HERE';
      
      // Create .env.local file with API keys
      const envContent = `# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${mapsKeyValue}

# Google Places API Key
GOOGLE_PLACES_API_KEY=${placesKeyValue}
`;

      fs.writeFileSync('.env.local', envContent);
      console.log(`${colors.green}Environment variables set up successfully.${colors.reset}`);
      
      // Add .env.local to .gitignore if not already present
      ensureEnvInGitignore();
      
      resolve(true);
    });
  });
}

function ensureEnvInGitignore() {
  try {
    let gitignoreContent = '';
    if (fs.existsSync('.gitignore')) {
      gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
    }
    
    if (!gitignoreContent.includes('.env.local')) {
      const envEntry = '\n# local env files\n.env*.local\n';
      fs.writeFileSync('.gitignore', gitignoreContent + envEntry);
      console.log(`${colors.green}Added .env.local to .gitignore${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}Warning: Failed to update .gitignore${colors.reset}`);
  }
}

// Main function
async function main() {
  // Setup environment variables
  await setupEnvironment();
  
  // Clean and build the project
  console.log(`\n${colors.bright}Step 1: Clean build artifacts and node_modules${colors.reset}`);
  runCommand('npm cache clean --force', 'Failed to clean npm cache');
  
  console.log(`\n${colors.bright}Step 2: Install dependencies${colors.reset}`);
  if (!runCommand('npm install', 'Failed to install dependencies')) {
    process.exit(1);
  }
  
  console.log(`\n${colors.bright}Step 3: Build the project${colors.reset}`);
  if (!runCommand('npm run build', 'Build failed')) {
    process.exit(1);
  }
  
  console.log(`\n${colors.bright}${colors.green}Build successful!${colors.reset}`);
  console.log(`\n${colors.cyan}Deployment Options:${colors.reset}`);
  console.log(`
1. For Vercel deployment:
   - Install Vercel CLI: npm install -g vercel
   - Run: vercel
   ${colors.yellow}Important: When deploying to Vercel, add your API keys as environment variables in their dashboard.${colors.reset}

2. For Netlify deployment:
   - Install Netlify CLI: npm install -g netlify-cli
   - Run: netlify deploy
   ${colors.yellow}Important: When deploying to Netlify, add your API keys as environment variables in their dashboard.${colors.reset}

3. For GitHub Pages:
   - Add "export": "next export" to package.json scripts
   - Run: npm run build && npm run export
   - Deploy the 'out' folder
   ${colors.yellow}Warning: For GitHub Pages, client-side API usage requires either a restricted key or proxy.${colors.reset}

4. For local testing:
   - Run: npm run start
   - Visit: http://localhost:3000
  `);
  
  console.log(`${colors.bright}${colors.green}Your project is ready for deployment!${colors.reset}`);
  
  // Close readline
  rl.close();
}

// Run the main function
main(); 