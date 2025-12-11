# Contributing to LAGE

First off, thank you for considering contributing to Linear And GitHub Extension (LAGE)! 🎉

It's people like you that make LAGE such a great tool. We welcome contributions from everyone, whether you're a seasoned developer or just getting started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## How Can I Contribute?

There are many ways to contribute to LAGE:

### 🐛 Report Bugs

Found a bug? [Open an issue](https://github.com/nelsondaza/linear-and-github-extension/issues/new) with:

- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable
- Your browser version and OS

### 💡 Suggest Features

Have an idea? [Start a discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions/new) or open an issue with:

- A clear description of the feature
- Why you think it would be useful
- Any examples or mockups

### 📝 Improve Documentation

Documentation can always be better! You can:

- Fix typos or clarify instructions
- Add examples or use cases
- Write tutorials or guides
- Translate documentation

### 💻 Submit Code

Ready to code? Great! See the sections below for our development workflow.

### 🎨 Design Contributions

Designers are welcome! We'd love help with:

- UI/UX improvements
- Icons and graphics
- Marketing materials
- Website design

### 🧪 Test and Review

Help us maintain quality by:

- Testing new features
- Reviewing pull requests
- Reporting edge cases
- Writing automated tests

---

## Getting Started

### Prerequisites

- Node.js v20.x or higher
- pnpm 9.12.0 (automatically installed)
- Git for version control
- Chrome for testing
- Code Editor (VSCode recommended with ESLint and Prettier extensions)

See the main [README.md](./README.md#development) for detailed system requirements.

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/linear-and-github-extension.git
   cd linear-and-github-extension
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/nelsondaza/linear-and-github-extension.git
   ```

### Install Dependencies

```bash
# Install all dependencies
pnpm install --frozen-lockfile

# Set up git hooks
pnpm prepare
```

### Verify Setup

```bash
pnpm lint && pnpm lint:tsc && pnpm dev
```

If all commands succeed, you're ready to start developing! 🚀

For troubleshooting setup issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#development-issues).

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your changes:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions**:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates
- `chore/` - Maintenance tasks

### 2. Make Your Changes

```bash
# Start the development server
pnpm dev

# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select build/chrome-mv3-dev/
```

The extension will auto-reload as you make changes.

### 3. Test Your Changes

- Test manually in Chrome
- Verify the extension works on GitHub PR and compare pages
- Test edge cases
- Run linting and type checking:
  ```bash
  pnpm lint
  pnpm lint:tsc
  ```

### 4. Format Your Code

```bash
# Format and fix lint issues
pnpm pretty
```

**Note**: Pre-commit hooks will automatically run Prettier and ESLint on staged files.

### 5. Commit Your Changes

Write clear, descriptive commit messages (see [Commit Guidelines](#commit-guidelines)).

```bash
git add .
git commit -m "feat: add support for Linear issue labels"
```

### 6. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

Use our [Pull Request Template](./pull_request_template.md) to structure your PR.

---

## Coding Standards

### Code Style

We enforce code style with ESLint and Prettier:

- **Line length**: 120 characters max
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Not required (omit them)
- **Trailing commas**: Always use them
- **Arrow functions**: Always use parentheses around parameters

### ESLint Rules

Key rules we follow:

- Airbnb style guide (with TypeScript)
- Import order enforcement (alphabetical)
- React hooks rules
- Accessibility (jsx-a11y)
- Tailwind CSS class order

### TypeScript

- Use strict type checking
- Avoid `any` - use proper types or `unknown`
- Use interfaces for object shapes
- Use type aliases for unions and primitives
- Document complex types with comments

### React Best Practices

- Use functional components with hooks
- Use descriptive component names (PascalCase)
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper dependency arrays in `useEffect` and `useCallback`

### File Organization

```
packages/
├── linear/           # Linear API integration
│   ├── client/       # API client code
│   ├── components/   # Linear-specific UI components
│   └── hooks/        # Custom hooks
├── github/           # GitHub-specific components
├── ui/               # Shared UI components
└── utils/            # Utilities and helpers
```

### Import Order

Imports should be ordered as:

1. External dependencies (React, etc.)
2. Internal packages (`@repo/*`)
3. Relative imports (`./*`, `../*`)
4. Style imports

Example:

```typescript
import React, { useState } from 'react'
import { LinearClient } from '@linear/sdk'

import { Button } from '@repo/ui'
import { formatDate } from '@repo/utils'

import { Header } from './Header'
import styles from './styles.css'
```

---

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring (no functional changes)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files

### Scope (Optional)

The scope should be the name of the package or component affected:

- `linear` - Linear API integration
- `github` - GitHub components
- `ui` - UI components
- `utils` - Utilities
- `docs` - Documentation
- `deps` - Dependencies

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep under 70 characters

### Examples

```
feat(linear): add support for issue labels
fix(ui): correct button alignment on mobile
docs(readme): update installation instructions
refactor(utils): simplify date formatting logic
perf(linear): cache API responses for 5 minutes
```

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if you've changed functionality
2. **Run all checks**:
   ```bash
   pnpm lint
   pnpm lint:tsc
   pnpm build
   ```
3. **Test manually** in Chrome
4. **Update CHANGELOG** if applicable (for significant changes)
5. **Rebase on main** to avoid merge conflicts:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Requirements

- [ ] All CI checks pass
- [ ] Code follows style guidelines
- [ ] Includes tests (if applicable)
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] PR description follows the template
- [ ] Commits follow the commit guidelines

### Review Process

1. A maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, a maintainer will merge your PR
4. Your contribution will be included in the next release!

### After Merge

- Delete your feature branch
- Update your fork:
  ```bash
  git checkout main
  git pull upstream main
  git push origin main
  ```

---

## Reporting Bugs

### Before Reporting

1. **Check existing issues** to avoid duplicates
2. **Update to the latest version** to see if it's already fixed
3. **Test in a clean environment** (disable other extensions)

### Bug Report Template

Include:

- **Clear title**: "Button not working on PR pages"
- **Description**: What happened vs what should happen
- **Steps to reproduce**: Numbered list of steps
- **Environment**:
  - LAGE version
  - Chrome version
  - Operating system
- **Screenshots**: If applicable
- **Console errors**: Check browser console for errors
- **Extension logs**: Any error messages from LAGE

### Security Vulnerabilities

**DO NOT** report security issues publicly. See our [Security Policy](./SECURITY.md).

---

## Suggesting Features

### Feature Request Template

Include:

- **Clear title**: "Add support for Linear custom fields"
- **Problem**: What problem does this solve?
- **Solution**: Describe your proposed solution
- **Alternatives**: Any alternative solutions you considered?
- **Use cases**: Who would benefit and how?
- **Examples**: Mockups, screenshots, or similar features in other tools

### Feature Discussion

Before implementing a major feature:

1. Open a [GitHub Discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions)
2. Get feedback from maintainers and community
3. Refine the design based on feedback
4. Then start implementation

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code contributions

### Getting Help

- Read the [documentation](./README.md)
- Search [existing issues](https://github.com/nelsondaza/linear-and-github-extension/issues)
- Ask in [Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)

### Recognition

Contributors are recognized in:

- Release notes
- GitHub contributors page
- README acknowledgments (for significant contributions)

---

## Project Structure

```
/
├── contents/              # Content scripts injected into GitHub pages
│   ├── githubCompare.tsx  # Compare page integration
│   └── githubPull.tsx     # Pull request page integration
├── packages/              # Monorepo packages
│   ├── linear/            # Linear API integration
│   ├── github/            # GitHub-specific components
│   ├── ui/                # Shared UI components
│   ├── utils/             # Shared utilities
│   └── git-commands/      # Git hooks
├── assets/                # Static assets (icons, images)
├── docs/                  # Documentation
├── .github/               # GitHub configuration (workflows, templates)
├── _popup.tsx             # Extension popup
├── _sidepanel.tsx         # Extension side panel
├── options.tsx            # Extension settings page
└── package.json           # Root package configuration
```

---

## Development Tips

### VSCode Setup

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- EditorConfig

### Debugging

- Use Chrome DevTools for debugging content scripts
- Use `console.log()` liberally during development
- Check the Chrome extension logs at `chrome://extensions/`

### Performance

- Use React DevTools Profiler to identify performance issues
- Avoid unnecessary re-renders
- Use memoization (`useMemo`, `useCallback`) appropriately
- Test with large GitHub PRs

### Testing in Different Scenarios

Test your changes with:

- PRs with many commits
- PRs with no Linear issues
- PRs with multiple Linear issues
- Different Linear issue formats
- Private and public repositories

---

## Resources

- [Plasmo Framework Documentation](https://docs.plasmo.com/)
- [Linear API Documentation](https://developers.linear.app/)
- [React Documentation](https://react.dev/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## Questions?

Don't hesitate to ask questions! We're here to help:

- Open a [Discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- Comment on an existing issue
- Reach out to maintainers

---

**Thank you for contributing to LAGE! Your efforts make this project better for everyone.** 🙏

---

_This contributing guide is a living document. Suggestions for improvements are welcome!_
