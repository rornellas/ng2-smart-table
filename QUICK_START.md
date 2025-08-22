# Quick Start Guide

## 🚀 Fast Track to Publishing

This guide gives you the quickest path to make changes and publish your package.

### Prerequisites
- Node.js installed
- Git configured
- npm account (for publishing)

---

## 📦 Publishing in 3 Steps

### Step 1: Make Your Changes
Edit files in `projects/ng2-smart-table/src/lib/`

### Step 2: Validate and Build
```bash
# Run all checks and build
npm run release
```
This will:
- ✅ Run linting
- ✅ Run tests
- ✅ Build the library
- ✅ Perform a dry run of publishing

### Step 3: Publish
```bash
# If step 2 succeeded, publish for real
npm run publish
```

---

## 🛠️ Common Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm run release` | **Full validation + dry run** | First time or important releases |
| `npm run release:force` | **Skip git checks** | When SSH key issues occur |
| `npm run release:dry` | **Build + dry run only** | Testing the publish process |
| `npm start` | **Start demo app** | Testing changes locally |

---

## 🔧 Troubleshooting

### If you get git authentication errors:
```bash
npm run release:force
```

### If build fails:
```bash
npm run clean
npm run build:lib
```

### If tests fail:
```bash
npm run test:ci
```

---

## 📋 Complete Workflow

### For Small Changes
```bash
# 1. Make your changes
# 2. Quick validation
npm run release:dry

# 3. Publish if successful
npm run publish
```

### For Major Changes
```bash
# 1. Make your changes
# 2. Full validation
npm run release

# 3. Update version if needed
npm run version:patch

# 4. Publish
npm run publish
```

---

## 📖 Detailed Documentation

For complete instructions, see:
- [DEVELOPMENT.md](DEVELOPMENT.md) - Full development guide
- [README.md](README.md) - Library documentation

---

**Need help?** Check the troubleshooting section in DEVELOPMENT.md or open an issue on GitHub.
