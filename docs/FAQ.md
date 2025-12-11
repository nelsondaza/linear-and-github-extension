# Frequently Asked Questions (FAQ)

Common questions about Linear And GitHub Extension (LAGE).

## Table of Contents

- [General](#general)
- [Installation & Setup](#installation--setup)
- [Features & Functionality](#features--functionality)
- [Privacy & Security](#privacy--security)
- [Pricing & Support](#pricing--support)
- [Technical](#technical)
- [Troubleshooting](#troubleshooting)

---

## General

### What is LAGE?

LAGE (Linear And GitHub Extension) is a free, open-source Chrome browser extension that integrates Linear issue tracking with GitHub. It displays Linear issue details directly on GitHub pull request and compare pages, making it easier to see the connection between your code changes and Linear issues.

### Is LAGE free?

Yes! LAGE is completely free and open-source under the MIT license. There are no paid features, subscriptions, or hidden costs.

### Who maintains LAGE?

LAGE is maintained by [@nelsondaza](https://github.com/nelsondaza) and community contributors. It's an open-source project welcoming contributions from everyone.

### How is LAGE different from Linear's GitHub integration?

LAGE is a **browser extension** that enhances your GitHub browsing experience locally, while Linear's official GitHub integration is a **server-side** integration that syncs data between the two platforms. They can be used together!

**LAGE adds**:

- Visual display of Linear issues on GitHub pages
- Quick access to issue details without leaving GitHub
- Local, privacy-focused operation

**Linear's integration provides**:

- Automatic issue status updates from PR status
- Git commit linking
- Branch creation from Linear

### What browsers are supported?

Currently:

- ✅ **Chrome** (officially supported)
- 🟡 **Edge** (Chromium-based, should work but not tested)
- ❌ **Firefox** (not yet supported)
- ❌ **Safari** (not yet supported)

See our [roadmap](./CHANGELOG.md) for future browser support.

---

## Installation & Setup

### How do I install LAGE?

**From Chrome Web Store** (coming soon):

1. Visit [Chrome Web Store](https://chromewebstore.google.com/detail/)
2. Click "Add to Chrome"

**Manual installation**:

1. Download from [GitHub Releases](https://github.com/nelsondaza/linear-and-github-extension/releases)
2. Extract ZIP and load as unpacked extension (`chrome://extensions/`)

For troubleshooting installation issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#installation-issues).

### Do I need a Linear account?

Yes, you need a Linear account to use LAGE. Linear offers a free plan!

### Do I need a paid Linear subscription?

No! LAGE works with **free Linear accounts**. API keys are available on all Linear plans.

### How do I get a Linear API key?

See our detailed [Linear API Key Setup Guide](./linear_API_KEY.md) for complete instructions.

### Can I use LAGE without a GitHub account?

You don't need to be logged into GitHub, but LAGE only works on GitHub pages. If you're viewing GitHub, it will work whether you're logged in or not.

### Does LAGE work with GitHub Enterprise?

Not yet. LAGE currently only supports `github.com`. Enterprise support is on our roadmap.

---

## Features & Functionality

### What GitHub pages does LAGE work on?

LAGE works on:

- ✅ Pull Request pages: `github.com/owner/repo/pull/123`
- ✅ Compare pages: `github.com/owner/repo/compare/main...branch?expand=1`

LAGE does NOT work on:

- ❌ Issue pages
- ❌ Commit pages
- ❌ Repository home pages
- ❌ Profile pages
- ❌ Other GitHub pages

### What Linear issue information does LAGE display?

LAGE shows:

- Issue title and description
- Status (backlog, started, completed, etc.)
- Priority (urgent, high, medium, low, none)
- Assignee (with avatar)
- Estimate points
- Labels and tags
- Project and team information
- Direct link to open in Linear

### How does LAGE detect Linear issues?

LAGE scans PR titles, descriptions, and commit messages for Linear issue codes in the format `[A-Z0-9]{1,7}-\d+` (e.g., `PROJ-123`).

For troubleshooting detection issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#linear-issues-not-displaying).

### Can LAGE detect issues in comments?

No, LAGE currently only scans PR titles, descriptions, and commit messages. Issue codes in comments are not detected.

### Can I create or update Linear issues from GitHub?

No, LAGE is **read-only**. It only displays issue information. You need to go to Linear to create or update issues.

For write operations, consider using [Linear's official GitHub integration](https://linear.app/docs/github).

### Does LAGE work offline?

No, LAGE requires an internet connection to fetch data from Linear's API.

### Does LAGE cache data?

Yes, LAGE caches API responses to improve performance and reduce API calls. Cache duration varies by data type.

---

## Privacy & Security

### Is my data safe?

Yes! LAGE is privacy-focused with no data collection, tracking, or third-party data sharing. API keys are stored locally and encrypted by Chrome.

See our [Privacy Policy](./PRIVACY.md) and [Security Policy](./SECURITY.md) for complete details.

### Where is my API key stored?

Your Linear API key is stored locally on your device using Chrome's secure storage API, encrypted by Chrome. It's never transmitted except to Linear's official API.

### What permissions does LAGE require?

- `*://*.github.com/*` - To inject UI on GitHub pages
- `*://*.linear.app/*` - To fetch issue data from Linear

### How do I report a security vulnerability?

Follow our [Security Policy](./SECURITY.md) to report vulnerabilities responsibly. **DO NOT** open a public issue.

---

## Pricing & Support

### How much does LAGE cost?

LAGE is **100% free** with no hidden costs, subscriptions, or paid features. It's a community-driven open-source project.

### How can I support LAGE?

You can support LAGE by:

- ⭐ Starring the [GitHub repository](https://github.com/nelsondaza/linear-and-github-extension)
- 🐛 Reporting bugs and issues
- 💡 Suggesting features
- 💻 Contributing code
- 📝 Improving documentation
- 🗣️ Spreading the word
- ☕ Donating (coming soon via Open Collective)

### Where do I get support?

- **Documentation**: Start with the [README](./README.md)
- **Troubleshooting**: Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
- **Questions**: Ask in [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Bugs**: Report in [GitHub Issues](https://github.com/nelsondaza/linear-and-github-extension/issues)

### Is there a community?

Yes! Join us:

- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bug reports
- **Pull Requests**: For contributions

---

## Technical

### What technologies does LAGE use?

- **Framework**: [Plasmo](https://www.plasmo.com/) (browser extension framework)
- **UI**: React with TypeScript
- **Styling**: Tailwind CSS
- **API**: Linear GraphQL API via [@linear/sdk](https://github.com/linear/linear)
- **State Management**: React Query
- **Package Manager**: pnpm

### Can I contribute to LAGE?

Absolutely! We welcome contributions of all kinds. See our [Contributing Guide](./CONTRIBUTING.md) for details.

### How do I build LAGE from source?

```bash
# Clone the repository
git clone https://github.com/nelsondaza/linear-and-github-extension.git
cd linear-and-github-extension

# Install dependencies
pnpm install --frozen-lockfile

# Start development server
pnpm dev

# Or build for production
pnpm build
```

See the [README](./README.md) for detailed instructions.

### What's the project structure?

LAGE uses a monorepo structure:

- `contents/` - Content scripts injected into GitHub
- `packages/linear/` - Linear API integration
- `packages/github/` - GitHub-specific components
- `packages/ui/` - Shared UI components
- `packages/utils/` - Shared utilities

### Does LAGE use APIs from Linear?

Yes, LAGE uses Linear's official GraphQL API. Your API key authenticates requests to this API.

**API documentation**: [Linear Developers](https://developers.linear.app/)

### How often does LAGE update?

- **Bug fixes**: As soon as possible (usually within days)
- **Features**: Based on roadmap and community feedback
- **Dependencies**: Regularly updated via Dependabot

Check [GitHub Releases](https://github.com/nelsondaza/linear-and-github-extension/releases) for updates.

### Does LAGE have tests?

Not yet! This is a great area for contribution. We welcome help adding:

- Unit tests
- Integration tests
- End-to-end tests

### What's on the roadmap?

Upcoming features may include:

- Firefox and Edge support
- GitHub Enterprise support
- Enhanced issue filtering
- Keyboard shortcuts
- Custom themes
- Performance optimizations

See [CHANGELOG](./CHANGELOG.md) for details.

---

## Troubleshooting

### LAGE isn't working. What should I do?

1. Check you're on a supported GitHub page (PR or compare)
2. Verify your Linear API key is configured
3. Reload the GitHub page (hard refresh: `Ctrl+Shift+R`)
4. Check browser console for errors (F12)
5. See the [Troubleshooting Guide](./TROUBLESHOOTING.md)

### Why aren't my Linear issues showing?

Common causes:

- Issue codes don't match the format (`PROJ-123`)
- Issues are in a different Linear workspace
- API key doesn't have access to the workspace
- Network or API issues

See [Linear Issues Not Displaying](./TROUBLESHOOTING.md#linear-issues-not-displaying) for solutions.

### How do I update LAGE?

- **From Chrome Web Store**: Automatic updates (may take a few days)
- **Manual installation**: Download latest release and reinstall

Check your version: `chrome://extensions/` > LAGE details

### Can I use multiple Linear workspaces?

Currently, LAGE supports **one API key at a time**, which is tied to a single Linear account. If you have access to multiple workspaces under that account, LAGE will work with all of them.

To switch workspaces: Generate a new API key from the other workspace and update LAGE settings.

**Multi-workspace support** (switching keys without re-entering) is on our wishlist!

### Does LAGE slow down GitHub?

LAGE is designed to be lightweight and performant. However:

- First load may be slower (fetching data)
- PRs with many issues require more API calls
- Large PRs may take longer to scan

If you experience performance issues, see [Performance Issues](./TROUBLESHOOTING.md#performance-issues).

### How do I uninstall LAGE?

1. Go to `chrome://extensions/`
2. Find "Linear And GitHub Extension"
3. Click "Remove"
4. Confirm removal

All locally stored data (API key, settings) will be deleted.

**Don't forget to revoke your API key** in [Linear Settings](https://linear.app/settings/api) if you're not using it anymore!

---

## Still Have Questions?

Can't find your answer here?

- **Search**: [GitHub Issues](https://github.com/nelsondaza/linear-and-github-extension/issues)
- **Ask**: [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Read**: [Full Documentation](./README.md)

---

**Happy integrating! If you found LAGE helpful, consider starring the repo! ⭐**
