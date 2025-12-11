<p align="center"><a href="https://nelsondaza.github.io/linear-and-github-extension/" target="_blank" rel="noreferrer noopener"><img width="200" alt="LAGE's mascot" src="https://raw.githubusercontent.com/nelsondaza/linear-and-github-extension/main/assets/icon.svg"></a></p>
<h2 align="center">Linear And GitHub Extension<br /><small><small>LAGE</small></small></h2>
<p align="center">
<a rel="noreferrer noopener" href="https://chromewebstore.google.com/detail/"><img alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-141e24.svg?&style=for-the-badge&logo=google-chrome&logoColor=white"></a>
<br/>
Linear And GitHub Extension is an <strong>open-source</strong> MIT-licensed <strong>Chrome browser extension</strong> designed to "link" Linear and GitHub web pages information. LAGE will generate cross-site sections that aims to <strong>let you easily check</strong> issues and PRs relations.
</p>

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](../LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.4-blue.svg)](https://github.com/nelsondaza/linear-and-github-extension/releases)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)

## 🌟 Features

- **Seamless Integration**: Automatically detects Linear issue codes in GitHub pull requests and compare views
- **Real-time Information**: Display Linear issue details directly on GitHub pages without switching tabs
- **Rich Issue Details**: View issue status, priority, assignee, estimates, and more
- **Beautiful UI**: Clean and intuitive interface that matches GitHub's design language
- **Privacy-First**: Your Linear API key is stored locally using Chrome's secure storage
- **Open Source**: MIT-licensed and community-driven development

## 📋 Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Building](#building)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Support](#support)
- [License](#license)

## 🚀 Installation

**Quick Install**: Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/) and click "Add to Chrome".

**Manual Installation**: Download from [GitHub Releases](https://github.com/nelsondaza/linear-and-github-extension/releases) and load as unpacked extension.

For detailed installation instructions and troubleshooting, see the [FAQ](./FAQ.md#installation--setup).

## ⚙️ Setup

After installation, you need to configure your Linear API key:

1. Click the LAGE extension icon and open Settings
2. Generate your Linear API key - see the **[Linear API Key Setup Guide](./linear_API_KEY.md)** for detailed instructions
3. Paste your API key in LAGE settings and save

**Important**: Your API key is stored securely using Chrome's Storage Sync API and is never shared with any external services. See our [Privacy Policy](./PRIVACY.md) for details.

## 💡 Usage

LAGE works automatically on:

- **GitHub Pull Requests**: `github.com/owner/repo/pull/123`
- **GitHub Compare Views**: `github.com/owner/repo/compare/main...feature?expand=1`

LAGE scans PR titles, descriptions, and commit messages for Linear issue codes (format: `PROJ-123`) and displays detailed issue information directly on the page.

For more details about features and functionality, see the [FAQ](./FAQ.md#features--functionality).

## 🛠️ Development

### Quick Start

```bash
# Clone and install
git clone https://github.com/nelsondaza/linear-and-github-extension.git
cd linear-and-github-extension
pnpm install --frozen-lockfile
pnpm prepare

# Start development
pnpm dev
# Load build/chrome-mv3-dev in Chrome (chrome://extensions/)
```

### Code Quality

```bash
pnpm lint        # Run ESLint
pnpm lint:tsc    # Run TypeScript type checking
pnpm pretty      # Format code with Prettier
```

**For comprehensive development guidelines**, including coding standards, commit conventions, and PR process, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## 🏗️ Building

```bash
# Development build with hot reload
pnpm dev

# Production build
pnpm build

# Create distribution ZIP
pnpm package
```

**Build output**: `build/chrome-mv3-dev/` (development) or `build/chrome-mv3-prod/` (production)

For troubleshooting build issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#development-issues).

## 🤝 Contributing

We welcome contributions! You can help by:

- 🐛 Reporting bugs in [Issues](https://github.com/nelsondaza/linear-and-github-extension/issues)
- 💡 Suggesting features in [Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- 💻 Submitting pull requests
- 📝 Improving documentation

**Before contributing**, please read:

- [Contributing Guidelines](./CONTRIBUTING.md) - Development workflow, coding standards, and PR process
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

**Security Issues**: Report vulnerabilities privately via our [Security Policy](./SECURITY.md).

## 📚 Documentation

- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to LAGE
- **[FAQ](./FAQ.md)** - Frequently asked questions
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[Linear API Key Setup](./linear_API_KEY.md)** - API key generation and configuration
- **[Privacy Policy](./PRIVACY.md)** - Data handling and privacy
- **[Security Policy](./SECURITY.md)** - Vulnerability reporting
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** - Community guidelines
- **[Changelog](./CHANGELOG.md)** - Version history and roadmap

## 🏗️ Architecture

LAGE is built using a monorepo structure with the following packages:

- **`@repo/linear`**: Linear API integration and components
- **`@repo/github`**: GitHub-specific UI components
- **`@repo/ui`**: Shared UI component library
- **`@repo/utils`**: Common utilities and helpers

**Tech Stack**:

- [Plasmo](https://www.plasmo.com/) - Browser extension framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query/v3/) - Data fetching
- [Linear SDK](https://github.com/linear/linear) - Linear API client

## ❓ Support

- **Questions?** Check the [FAQ](./FAQ.md) or [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Found a Bug?** See [Troubleshooting](./TROUBLESHOOTING.md) or [open an issue](https://github.com/nelsondaza/linear-and-github-extension/issues/new)
- **Need Help?** Search [existing issues](https://github.com/nelsondaza/linear-and-github-extension/issues) or start a [discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Plasmo](https://www.plasmo.com/)
- Linear integration powered by [@linear/sdk](https://github.com/linear/linear)
- UI components inspired by [Headless UI](https://headlessui.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 🌐 Links

- **Website**: [https://nelsondaza.github.io/linear-and-github-extension/](https://nelsondaza.github.io/linear-and-github-extension/)
- **Repository**: [https://github.com/nelsondaza/linear-and-github-extension](https://github.com/nelsondaza/linear-and-github-extension)
- **Chrome Web Store**: [Coming Soon](https://chromewebstore.google.com/detail/)
- **Issues**: [https://github.com/nelsondaza/linear-and-github-extension/issues](https://github.com/nelsondaza/linear-and-github-extension/issues)
- **Discussions**: [https://github.com/nelsondaza/linear-and-github-extension/discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)

---

<p align="center">Made with ❤️ by <a href="https://github.com/nelsondaza">Nelson Daza</a> and <a href="https://github.com/nelsondaza/linear-and-github-extension/graphs/contributors">contributors</a></p>
