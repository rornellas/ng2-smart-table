# Development Guide: ng2-smart-table

This guide covers the complete development workflow for the `@rornellas/ng2-smart-table` Angular library, including local development, testing, building, and publishing.

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm (v6 or higher)
- Git
- Angular CLI (`npm install -g @angular/cli`)

### Installation
```bash
# Clone the repository
git clone https://github.com/rornellas/ng2-smart-table.git
cd ng2-smart-table

# Install dependencies
npm install
```

## 🛠️ Development Workflow

### Local Development

#### Start the Demo Application
```bash
npm start
```
This will start the demo application at `http://localhost:4200` where you can see and test the library components.

#### Development with Live Reload
```bash
npm start
```
- Opens browser at `http://localhost:4200`
- Supports hot reload for both library and demo
- Perfect for interactive development

### Making Changes

#### 1. Edit Library Code
The main library code is located in:
- `projects/ng2-smart-table/src/lib/` - Library source code
- `projects/ng2-smart-table/src/public-api.ts` - Public API exports

#### 2. Edit Demo Code
Demo application code is in:
- `projects/demo/src/` - Demo application source

#### 3. Build Library
```bash
# Build the library
npm run build:lib

# Build demo application
npm run build:demo

# Build both
npm run build:ci
```

### Testing

#### Run Unit Tests
```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI mode)
npm run test:ci
```

#### Run E2E Tests
```bash
npm run e2e
```

#### Code Quality
```bash
# Lint code
npm run lint

# Lint and fix automatically
npm run lint:fix
```

### Version Management

#### Update Version
```bash
# Patch version (1.0.0 -> 1.0.1)
npm run version:patch

# Minor version (1.0.0 -> 1.1.0)
npm run version:minor

# Major version (1.0.0 -> 2.0.0)
npm run version:major
```

## 📦 Publishing to npm

### Quick Publishing Commands

#### Safe Publishing (Recommended)
```bash
# Full validation + dry run (recommended for first time)
npm run release

# Or just dry run without full validation
npm run release:dry
```

#### Force Publishing (When having git issues)
```bash
# Skip git checks (when SSH keys are not configured)
npm run release:force
```

#### Manual Publishing Steps
If you need more control, you can run each step individually:

```bash
# 1. Validate code quality
npm run validate

# 2. Build library
npm run build:lib

# 3. Test publish (dry run)
npm run publish:safe

# 4. Actually publish
npm run publish
```

### Publishing Workflow

#### First Time Publishing
```bash
# 1. Ensure you're logged into npm
npm login

# 2. Run full release process
npm run release
```

#### Subsequent Publishing
```bash
# Quick publish (builds, validates, and publishes)
npm run release
```

#### Emergency Publishing (when git issues occur)
```bash
# Force publish without git validation
npm run release:force
```

### Publishing Options

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run release` | Full validation + safe publish | **Recommended** - First time or important releases |
| `npm run release:dry` | Build + dry run only | Testing publish process |
| `npm run release:force` | Skip git checks | When SSH key issues prevent normal publishing |
| `npm run publish` | Direct publish | When you know what you're doing |
| `npm run publish:force` | Force publish | Emergency situations |

## 🧪 Testing Locally

### Test in Your Own Project

#### Method 1: npm link (Recommended)
```bash
# In library project
npm link

# In your test project
npm link @rornellas/ng2-smart-table
```

#### Method 2: Build and Install
```bash
# Build library
npm run build:lib

# Install from local dist
cd dist/ng2-smart-table
npm pack
# This creates a .tgz file

# In your test project
npm install /path/to/ng2-smart-table-1.6.0.tgz
```

#### Method 3: Use npm link with watch mode
```bash
# Terminal 1: Library development with watch
npm run build:lib -- --watch

# Terminal 2: Demo application
npm start
```

### Testing Checklist
- [ ] Library builds without errors
- [ ] Demo application runs
- [ ] All tests pass
- [ ] Linting passes
- [ ] Components render correctly
- [ ] No console errors
- [ ] All features work as expected

## 🔧 Troubleshooting

### Common Issues

#### Git Authentication Issues
```bash
# If you get git authentication errors during publish:
npm run release:force
```

#### Build Issues
```bash
# Clean and rebuild
npm run clean
npm run build:lib
```

#### Dependency Issues
```bash
# Clean install all dependencies
npm run clean:all
```

#### Test Issues
```bash
# Clear test cache
npm test -- --clearCache
```

### SSH Key Setup (Optional)
If you want to avoid git authentication issues:

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Add to GitHub (Settings > SSH and GPG keys)
cat ~/.ssh/id_rsa.pub

# Test connection
ssh -T git@github.com
```

## 📋 Release Checklist

### Before Publishing
- [ ] Run full test suite: `npm run validate`
- [ ] Update version if needed: `npm run version:patch`
- [ ] Update changelog: `npm run changelog`
- [ ] Test in demo application
- [ ] Test in external project (if possible)

### Publishing Steps
- [ ] Run `npm run release` for safe publishing
- [ ] Verify package on npm: `npm view @rornellas/ng2-smart-table`
- [ ] Test installation: `npm install @rornellas/ng2-smart-table`

### After Publishing
- [ ] Create git tag: `git tag v1.6.0 && git push origin v1.6.0`
- [ ] Update GitHub release
- [ ] Notify team/stakeholders

## 🏗️ Project Structure

```
ng2-smart-table/
├── projects/
│   ├── ng2-smart-table/          # Library source
│   │   ├── src/
│   │   │   ├── lib/             # Library components
│   │   │   └── public-api.ts    # Public API
│   │   └── package.json         # Library package.json
│   └── demo/                    # Demo application
├── dist/                        # Build output
├── node_modules/               # Dependencies
├── angular.json               # Angular CLI config
├── tsconfig.json              # TypeScript config
└── package.json              # Root package.json
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/publish.yml
name: Publish to npm
on:
  push:
    tags:
      - 'v*'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish dist/ng2-smart-table
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 📚 Additional Resources

### Useful Commands
```bash
# View package info
npm view @rornellas/ng2-smart-table

# Check if package exists
npm search @rornellas/ng2-smart-table

# Download and test specific version
npm install @rornellas/ng2-smart-table@1.6.0
```

### Documentation Links
- [Angular Library Guide](https://angular.io/guide/creating-libraries)
- [npm Publishing Guide](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [Semantic Versioning](https://semver.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Run validation: `npm run validate`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📞 Support

If you encounter issues:
1. Check this documentation
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Include your Node.js version, npm version, and error messages

---

**Happy Coding! 🎉**

For questions or issues, please open a GitHub issue at: https://github.com/rornellas/ng2-smart-table/issues
