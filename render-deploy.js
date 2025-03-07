#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if render.yaml exists
if (!fs.existsSync('./render.yaml')) {
  console.error('Error: render.yaml not found. Please create a render.yaml file first.');
  process.exit(1);
}

// Get repository information
const repoUrl = execSync('git config --get remote.origin.url').toString().trim();
const branch = execSync('git branch --show-current').toString().trim();

console.log('=== Deploying to Render ===');
console.log(`Repository: ${repoUrl}`);
console.log(`Branch: ${branch}`);

// Ask for Render API key
rl.question('Please enter your Render API key (get it from https://dashboard.render.com/account/api-keys): ', (apiKey) => {
  if (!apiKey) {
    console.error('Error: API key is required.');
    rl.close();
    process.exit(1);
  }

  // Create a blueprint deployment request
  const blueprintData = JSON.stringify({
    repo: repoUrl,
    branch,
    autoDeploy: 'yes'
  });

  const options = {
    hostname: 'api.render.com',
    port: 443,
    path: '/v1/blueprints',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Content-Length': blueprintData.length
    }
  };

  console.log('Triggering deploy on Render...');
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('=== Deployment initiated ===');
        console.log('Check your Render dashboard for deployment status: https://dashboard.render.com');
        try {
          const responseData = JSON.parse(data);
          console.log(`Deployment ID: ${responseData.id}`);
        } catch (e) {
          console.log('Response:', data);
        }
      } else {
        console.error(`Error: ${res.statusCode}`);
        console.error(data);
      }
      rl.close();
    });
  });
  
  req.on('error', (error) => {
    console.error('Error:', error);
    rl.close();
  });
  
  req.write(blueprintData);
  req.end();
}); 