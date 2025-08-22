#!/usr/bin/env node

/**
 * Validation script for ng2-smart-table package
 * This script validates the package before publishing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Validating ng2-smart-table package...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log('green', `✅ ${description} found: ${filePath}`);
    return true;
  } else {
    log('red', `❌ ${description} missing: ${filePath}`);
    return false;
  }
}

function checkPackageJson() {
  log('blue', '📦 Checking package.json files...');

  const rootPkgPath = path.join(__dirname, '..', 'package.json');
  const libPkgPath = path.join(__dirname, '..', 'projects', 'ng2-smart-table', 'package.json');

  let allGood = true;

  // Check root package.json
  if (checkFileExists(rootPkgPath, 'Root package.json')) {
    const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
    const requiredFields = ['name', 'version', 'description', 'repository', 'author'];

    requiredFields.forEach(field => {
      if (!rootPkg[field]) {
        log('red', `❌ Missing required field in root package.json: ${field}`);
        allGood = false;
      }
    });

    if (rootPkg.name !== '@rornellas/ng2-smart-table') {
      log('red', `❌ Incorrect package name: ${rootPkg.name}`);
      allGood = false;
    } else {
      log('green', `✅ Package name: ${rootPkg.name}`);
    }

    log('cyan', `📋 Version: ${rootPkg.version}`);
  } else {
    allGood = false;
  }

  // Check library package.json
  if (checkFileExists(libPkgPath, 'Library package.json')) {
    const libPkg = JSON.parse(fs.readFileSync(libPkgPath, 'utf8'));
    const requiredFields = ['name', 'version', 'description', 'repository', 'keywords'];

    requiredFields.forEach(field => {
      if (!libPkg[field]) {
        log('red', `❌ Missing required field in library package.json: ${field}`);
        allGood = false;
      }
    });

    if (libPkg.name !== '@rornellas/ng2-smart-table') {
      log('red', `❌ Incorrect library package name: ${libPkg.name}`);
      allGood = false;
    } else {
      log('green', `✅ Library package name: ${libPkg.name}`);
    }

    if (libPkg.keywords && libPkg.keywords.length > 0) {
      log('green', `✅ Keywords: ${libPkg.keywords.join(', ')}`);
    }
  } else {
    allGood = false;
  }

  return allGood;
}

function checkBuildOutput() {
  log('blue', '\n🏗️  Checking build output...');

  const distPath = path.join(__dirname, '..', 'dist', 'ng2-smart-table');
  const requiredFiles = [
    'package.json',
    'README.md',
    'rornellas-ng2-smart-table.d.ts',
    'bundles/rornellas-ng2-smart-table.umd.js',
    'fesm2015/rornellas-ng2-smart-table.js',
    'fesm5/rornellas-ng2-smart-table.js'
  ];

  let allGood = true;

  if (!checkFileExists(distPath, 'Distribution directory')) {
    log('yellow', '⚠️  Distribution directory not found. Run `npm run build:lib` first.');
    return false;
  }

  requiredFiles.forEach(file => {
    if (!checkFileExists(path.join(distPath, file), `Build artifact: ${file}`)) {
      allGood = false;
    }
  });

  // Check package.json in dist
  const distPkgPath = path.join(distPath, 'package.json');
  if (fs.existsSync(distPkgPath)) {
    const distPkg = JSON.parse(fs.readFileSync(distPkgPath, 'utf8'));
    log('cyan', `📋 Distribution version: ${distPkg.version}`);

    if (distPkg.main && distPkg.module && distPkg.typings) {
      log('green', '✅ All required entry points present');
    } else {
      log('red', '❌ Missing entry points in distribution package.json');
      allGood = false;
    }
  }

  return allGood;
}

function checkSourceFiles() {
  log('blue', '\n📁 Checking source files...');

  const srcPath = path.join(__dirname, '..', 'projects', 'ng2-smart-table', 'src');
  const requiredFiles = [
    'public-api.ts',
    'lib/ng2-smart-table.component.ts',
    'lib/ng2-smart-table.module.ts'
  ];

  let allGood = true;

  requiredFiles.forEach(file => {
    if (!checkFileExists(path.join(srcPath, file), `Source file: ${file}`)) {
      allGood = false;
    }
  });

  return allGood;
}

function runTests() {
  log('blue', '\n🧪 Running tests...');

  try {
    execSync('npm run test:ci', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    log('green', '✅ All tests passed');
    return true;
  } catch (error) {
    log('red', '❌ Tests failed');
    return false;
  }
}

function runLint() {
  log('blue', '\n🔍 Running linting...');

  try {
    execSync('npm run lint', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    log('green', '✅ Linting passed');
    return true;
  } catch (error) {
    log('red', '❌ Linting failed');
    return false;
  }
}

// Main validation function
function validate() {
  log('magenta', '🚀 Starting validation process...\n');

  let allGood = true;

  // Run checks
  allGood = checkPackageJson() && allGood;
  allGood = checkSourceFiles() && allGood;
  allGood = checkBuildOutput() && allGood;
  allGood = runLint() && allGood;
  allGood = runTests() && allGood;

  // Summary
  console.log('\n' + '='.repeat(50));
  if (allGood) {
    log('green', '🎉 All validations passed! Package is ready for publishing.');
    log('cyan', '\nNext steps:');
    log('cyan', '  1. Run: npm run publish:safe (for dry run)');
    log('cyan', '  2. Run: npm run publish (for actual publish)');
    process.exit(0);
  } else {
    log('red', '❌ Validation failed. Please fix the issues before publishing.');
    log('yellow', '\nCommon fixes:');
    log('yellow', '  - Run: npm run build:lib');
    log('yellow', '  - Run: npm run lint:fix');
    log('yellow', '  - Check package.json files');
    process.exit(1);
  }
}

// Run validation if called directly
if (require.main === module) {
  validate();
}

module.exports = { validate };
