# Copilot Instructions for Linear and GitHub Extension (LAGE)

## Project Overview

**Linear and GitHub Extension (LAGE)** is an open-source Chrome browser extension that integrates Linear issue tracking with GitHub. The extension injects UI components into GitHub pages (pull requests and compare views) to display related Linear issues, making it easier to see the connection between GitHub PRs and Linear issues.

**Repository Type:** Chrome browser extension using Plasmo framework  
**Primary Language:** TypeScript/React  
**Package Manager:** pnpm 9.12.0  
**Node Version:** 20.x+ (tested with v25.2.1)  
**Framework:** Plasmo v0.89.4 (browser extension framework)

## Architecture & Project Structure

### Root Structure
```
/                          # Root directory
├── _popup.tsx            # Extension popup component
├── _sidepanel.tsx        # Extension side panel component
├── options.tsx           # Extension options/settings page
├── contents/             # Content scripts injected into web pages
│   ├── githubCompare.tsx # Injected into GitHub compare pages
│   └── githubPull.tsx    # Injected into GitHub pull request pages
├── packages/             # Monorepo packages (internal workspace)
│   ├── linear/           # Linear API integration & components
│   ├── github/           # GitHub-specific components
│   ├── ui/               # Shared UI components library
│   ├── utils/            # Shared utilities
│   └── git-commands/     # Git hooks configuration
├── assets/               # Static assets (icons, images)
├── build/                # Build output (gitignored)
└── .plasmo/              # Plasmo framework cache (gitignored)
```

### Package Architecture
This is a **monorepo** with internal packages referenced via TypeScript path aliases:
- `@repo/linear` → `packages/linear/src`
- `@repo/github` → `packages/github/src`
- `@repo/ui` → `packages/ui/src`
- `@repo/utils` → `packages/utils/src`

All packages are **private** and have `sideEffects: false` in their package.json.

### Key Components
- **Content Scripts**: `contents/githubCompare.tsx` and `contents/githubPull.tsx` are Plasmo content scripts that inject UI into GitHub pages
- **Linear Integration**: `packages/linear/src/client/` contains Linear API client using `@linear/sdk`
- **UI Components**: `packages/ui/src/components/` contains reusable components (Button, Input, Modal, Drawer, Table, etc.)
- **Styling**: Uses Tailwind CSS with custom configuration in `tailwind.config.ts`

## Build & Development Commands

### Initial Setup
```bash
# Always run after cloning or when dependencies change
pnpm install --frozen-lockfile

# Configure git hooks (run once after clone)
pnpm prepare
```

### Development
```bash
# Start development server with hot reload
pnpm dev

# Load the extension from build/chrome-mv3-dev in Chrome
```

### Production Build
```bash
# Clean build (recommended before production build)
rm -rf build/ .plasmo/ tsconfig.tsbuildinfo

# Build for production
pnpm build
# Output: build/chrome-mv3-prod/

# Create distribution zip
pnpm package
# Output: build/chrome-mv3-prod.zip
```

**Build Time:** ~3-5 seconds (clean build)  
**Known Build Warnings:** 
- Browserslist data outdated warning (safe to ignore)
- Plasmo version update available (safe to ignore unless instructed)

### Code Quality Commands
```bash
# Run ESLint (with caching)
pnpm lint

# Run ESLint with auto-fix on specific files
pnpm lint:files --fix <file1> <file2>

# Type check with TypeScript
pnpm lint:tsc

# Format code with Prettier and fix lint issues
pnpm pretty
```

**IMPORTANT:** Always run both `pnpm lint` and `pnpm lint:tsc` after making changes. These commands should complete with no errors before committing.

## Pre-commit & Pre-push Hooks

Git hooks are located in `packages/git-commands/hooks/` and are automatically configured via the `prepare` script.

### Pre-commit Hook Behavior
1. Runs Prettier on staged files (`.yml`, `.scss`, `.css`, `.json`, `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.tsx`)
2. Runs ESLint with auto-fix on staged JavaScript/TypeScript files
3. Re-adds fixed files to staging area
4. **Skips** on detached HEAD state

### Pre-push Hook Behavior
1. Compares files against `origin/HEAD`
2. Runs Prettier and ESLint on changed files
3. Auto-fixes issues before push

**Note:** Hooks are interactive (`exec < /dev/tty`) and will prompt if terminal is available.

## CI/CD Pipeline

### GitHub Actions Workflow
**File:** `.github/workflows/tagged-release.yml`

**Trigger:** Push tags matching `v*.*.*` pattern or manual workflow dispatch

**Steps:**
1. Checkout code
2. Install pnpm via `pnpm/action-setup@v4`
3. Cache pnpm store using `actions/cache@v4`
4. Setup Node.js 20.x with pnpm cache
5. Run `pnpm install --frozen-lockfile`
6. Update version in package.json from tag
7. Run `pnpm build`
8. Run `pnpm package`
9. Create GitHub release with `build/chrome-mv3-prod.zip`
10. Upload artifact with configurable retention
11. Publish to Chrome Web Store (requires secrets)

**Required Secrets:**
- `CWS_CLIENT_ID`
- `CWS_CLIENT_SECRET`
- `CWS_EXTENSION_ID`
- `CWS_REFRESH_TOKEN`

## Linting & Code Style

### ESLint Configuration
**File:** `.eslintrc.js`

**Key Rules:**
- **Extends:** Airbnb, Airbnb hooks, Prettier, Unicorn, Perfectionist
- **Import order:** Enforced with alphabetical sorting and newlines between groups
- **Max line length:** 120 characters
- **Indentation:** 2 spaces, SwitchCase indented
- **Arrow functions:** Always use parentheses around parameters
- **Import extensions:** Never use extensions for `.js`, `.jsx`, `.ts`, `.tsx`
- **Sorting:** Natural sorting for imports, object types, JSX props via Perfectionist plugin
- **Tailwind:** Enforced via `eslint-plugin-tailwindcss`

**Plugins:** import, tailwindcss, perfectionist, sort-class-members, unicorn, react, react-hooks, jsx-a11y

### Prettier Configuration
**File:** `.prettierrc`
```json
{
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "arrowParens": "always"
}
```

**Key Style:**
- No semicolons
- Single quotes
- 120 character line width
- Always trailing commas
- Arrow function params always wrapped in parens

### TypeScript Configuration
**File:** `tsconfig.json`

- Extends Plasmo's base config
- JSX mode: `react-jsx`
- Path aliases configured for `@repo/*` packages
- Includes `reset.d.ts` for TypeScript reset types

## Common Issues & Workarounds

### Issue: Build fails after dependency changes
**Solution:** Clean and reinstall
```bash
rm -rf node_modules/ pnpm-lock.yaml
pnpm install
```

### Issue: Type errors in IDE but builds fine
**Solution:** Clean TypeScript cache
```bash
rm -rf tsconfig.tsbuildinfo .plasmo/
pnpm lint:tsc
```

### Issue: ESLint cache causing stale errors
**Solution:** Remove ESLint cache
```bash
rm -rf build/.eslintcache
pnpm lint
```

### Issue: Changes not appearing in development
**Solution:** Restart dev server and reload extension
```bash
# Stop dev server (Ctrl+C)
rm -rf .plasmo/
pnpm dev
```

## Extension-Specific Details

### Manifest Permissions
The extension requires host permissions for:
- `*://*.github.com/*` - Inject UI into GitHub pages
- `*://*.linear.app/*` - Access Linear API

### Storage
- Uses `@plasmohq/storage` for settings persistence
- Stores Linear API keys via Chrome Storage Sync API
- Settings accessible via options page (`options.tsx`)

### Content Script Injection
- **GitHub Pull Requests:** Matches `https://github.com/*/pull/*`
- **GitHub Compare:** Matches `https://github.com/*/compare/*?expand=*`
- Injects components using Plasmo's `getInlineAnchor` API

### Linear API Integration
- Requires user-provided Linear API key
- Documentation in `docs/linear_API_KEY.md`
- Pattern for Linear issue codes: `[A-Z0-9]{1,7}-\d+` (e.g., `PROJ-123`)

## Dependencies Management

**Dependabot:** Configured for weekly npm dependency updates (`.github/dependabot.yml`)

**Key Dependencies:**
- `plasmo` - Extension framework
- `react` / `react-dom` - UI library
- `@linear/sdk` - Linear API client
- `react-query` - Data fetching
- `@headlessui/react` - UI primitives
- `@heroicons/react` - Icon library

## Testing

**Note:** This project currently has **no automated tests**. Manual testing required:
1. Build extension with `pnpm build`
2. Load `build/chrome-mv3-prod` in Chrome
3. Navigate to GitHub PR or compare page
4. Verify Linear issues display correctly

## Final Checklist for Changes

Before committing any code changes:
- [ ] Run `pnpm lint` - should pass with no errors
- [ ] Run `pnpm lint:tsc` - should pass with no type errors
- [ ] Run `pnpm build` - should complete successfully in ~3-5 seconds
- [ ] Run `pnpm package` - should create zip file
- [ ] Test extension manually by loading build output in Chrome
- [ ] Verify no generated files are staged (check `.gitignore`)

## Trust These Instructions

These instructions have been validated against the actual codebase and build commands. Only perform additional exploration if:
1. Commands documented here fail unexpectedly
2. You need information about implementation details not covered here
3. The instructions appear outdated based on error messages

When in doubt, refer to these instructions first before exploring the codebase.
