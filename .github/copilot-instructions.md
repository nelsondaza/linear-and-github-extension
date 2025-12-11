# Copilot Instructions for Linear and GitHub Extension (LAGE)

## Project Overview

**Linear and GitHub Extension (LAGE)** is an open-source Chrome browser extension that integrates Linear issue tracking with GitHub. The extension injects UI components into GitHub pages (pull requests and compare views) to display related Linear issues, making it easier to see the connection between GitHub PRs and Linear issues.

**Repository Type:** Chrome browser extension using Plasmo framework  
**Primary Language:** TypeScript/React  
**Package Manager:** pnpm 9.12.0  
**Node Version:** 20.x+ (tested with v25.2.1)  
**Framework:** Plasmo v0.89.4 (browser extension framework)

## Documentation

**Complete documentation** is available in the `docs/` directory:

- **[docs/README.md](../docs/README.md)** - Main comprehensive guide (installation, setup, usage, architecture)
- **[docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md)** - Development workflow, coding standards, commit conventions
- **[docs/FAQ.md](../docs/FAQ.md)** - Frequently asked questions
- **[docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[docs/linear_API_KEY.md](../docs/linear_API_KEY.md)** - Linear API key setup guide
- **[docs/CHANGELOG.md](../docs/CHANGELOG.md)** - Version history and roadmap

**Always refer to these docs** for detailed information before exploring the codebase.

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
├── docs/                 # Complete documentation
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

**For detailed architecture**, see [docs/README.md#architecture](../docs/README.md#architecture).

## Quick Reference: Essential Commands

### Initial Setup

```bash
pnpm install --frozen-lockfile  # Install dependencies
pnpm prepare                     # Configure git hooks
```

### Development

```bash
pnpm dev      # Start dev server (output: build/chrome-mv3-dev)
pnpm lint     # Run ESLint
pnpm lint:tsc # Run TypeScript type checking
pnpm pretty   # Format code and fix lint issues
```

### Production

```bash
pnpm build    # Production build (output: build/chrome-mv3-prod)
pnpm package  # Create ZIP for Chrome Web Store
```

**Full command reference**: [docs/README.md#development](../docs/README.md#development)

## Code Quality Requirements

**Before committing:**
- ✅ `pnpm lint` must pass with no errors
- ✅ `pnpm lint:tsc` must pass with no type errors
- ✅ Git hooks will auto-format and fix issues

**For complete coding standards**, see [docs/CONTRIBUTING.md#coding-standards](../docs/CONTRIBUTING.md#coding-standards).

## Linting & Code Style

### ESLint Configuration

**Key Rules:**
- Extends: Airbnb, Airbnb TypeScript, Prettier, Unicorn, Perfectionist
- Max line length: 120 characters
- Indentation: 2 spaces
- Import order: Alphabetical with newlines between groups
- Tailwind CSS: Class order enforced

**Plugins:** import, tailwindcss, perfectionist, sort-class-members, unicorn, react, react-hooks, jsx-a11y

### Prettier Configuration

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

**Key Style:** No semicolons, single quotes, 120 chars, trailing commas

### TypeScript

- Extends Plasmo's base config
- JSX mode: `react-jsx`
- Path aliases for `@repo/*` packages
- Strict type checking enabled

## Git Hooks

**Location:** `packages/git-commands/hooks/`

**Pre-commit:**
- Runs Prettier on staged files
- Runs ESLint with auto-fix
- Re-adds fixed files to staging

**Pre-push:**
- Validates code quality before push
- Auto-fixes issues

**For hook details**, see [docs/CONTRIBUTING.md#development-workflow](../docs/CONTRIBUTING.md#development-workflow).

## Extension-Specific Details

### Manifest Permissions

- `*://*.github.com/*` - Inject UI into GitHub pages
- `*://*.linear.app/*` - Access Linear API

### Content Script Injection

- **GitHub Pull Requests:** `https://github.com/*/pull/*`
- **GitHub Compare:** `https://github.com/*/compare/*?expand=*`
- Uses Plasmo's `getInlineAnchor` API

### Linear API Integration

- Requires user-provided Linear API key
- Issue code format: `[A-Z0-9]{1,7}-\d+` (e.g., `PROJ-123`)
- Scans: PR titles, descriptions, commit messages

**For API key setup**, see [docs/linear_API_KEY.md](../docs/linear_API_KEY.md).

## Common Issues & Quick Fixes

### Build fails after dependency changes
```bash
rm -rf node_modules/ pnpm-lock.yaml && pnpm install
```

### Type errors in IDE but builds fine
```bash
rm -rf tsconfig.tsbuildinfo .plasmo/ && pnpm lint:tsc
```

### ESLint cache causing stale errors
```bash
rm -rf build/.eslintcache && pnpm lint
```

### Changes not appearing in development
```bash
rm -rf .plasmo/ && pnpm dev
```

**For comprehensive troubleshooting**, see [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md).

## CI/CD Pipeline

**File:** `.github/workflows/tagged-release.yml`

**Trigger:** Push tags matching `v*.*.*` or manual dispatch

**Key Steps:**
1. Install dependencies with pnpm
2. Build production version
3. Create distribution ZIP
4. Create GitHub release
5. Publish to Chrome Web Store (with secrets)

**Required Secrets:** CWS_CLIENT_ID, CWS_CLIENT_SECRET, CWS_EXTENSION_ID, CWS_REFRESH_TOKEN

## Testing

**Note:** This project currently has **no automated tests**. Manual testing required:

1. Build: `pnpm build`
2. Load `build/chrome-mv3-prod` in Chrome (`chrome://extensions/`)
3. Navigate to GitHub PR or compare page
4. Verify Linear issues display correctly

**For testing guidelines**, see [docs/CONTRIBUTING.md#testing-the-pr](../docs/CONTRIBUTING.md#testing-the-pr).

## Pre-Commit Checklist

- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm lint:tsc` passes with no type errors
- [ ] `pnpm build` completes successfully (~3-5 seconds)
- [ ] Extension tested manually in Chrome
- [ ] No generated files staged (check `.gitignore`)
- [ ] Commit message follows [Conventional Commits](../docs/CONTRIBUTING.md#commit-guidelines)

**Full checklist**: [docs/CONTRIBUTING.md#pull-request-process](../docs/CONTRIBUTING.md#pull-request-process)

## Key Dependencies

- `plasmo` (0.89.4) - Extension framework
- `react` (18.3.1) / `react-dom` - UI library
- `@linear/sdk` (^35.0.0) - Linear API client
- `react-query` (^3.39.3) - Data fetching
- `@headlessui/react` (^2.2.9) - UI primitives
- `@heroicons/react` (^2.2.0) - Icon library
- `tailwindcss` (^3.4.19) - Styling

**Dependabot:** Configured for weekly npm dependency updates

## Important Conventions

### Import Order
1. External dependencies (React, etc.)
2. Internal packages (`@repo/*`)
3. Relative imports (`./*`, `../*`)
4. Style imports

### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks

### File Naming
- Components: PascalCase (e.g., `LinearIssue.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useCompareCodes.ts`)

**Complete conventions**: [docs/CONTRIBUTING.md#coding-standards](../docs/CONTRIBUTING.md#coding-standards)

## Trust the Documentation

These instructions provide a quick reference. **Always consult the full documentation** in `docs/` for:
- Detailed setup and configuration
- Comprehensive troubleshooting
- Contributing guidelines
- Security and privacy policies

**When in doubt:**
1. Check [docs/README.md](../docs/README.md) first
2. Search [docs/FAQ.md](../docs/FAQ.md) for your question
3. Review [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md) for issues
4. Refer to [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development

Only explore the codebase directly if the documentation doesn't cover your specific case.

---

**Documentation Version:** 1.0 (Updated December 2025)  
**Project Version:** 0.0.4
