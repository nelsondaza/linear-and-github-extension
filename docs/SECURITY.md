# Security Policy

## Our Commitment

The security of Linear And GitHub Extension (LAGE) and our users is of utmost importance. We take all security vulnerabilities seriously and are committed to addressing them promptly and transparently.

Any security vulnerability discovered will be fixed as soon as possible with minimal impact when reported responsibly.

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          | Status     |
| ------- | ------------------ | ---------- |
| 0.0.4   | :white_check_mark: | Latest     |
| < 0.0.4 | :x:                | Deprecated |

**Important**: Please ensure you are always running the [latest version available](https://github.com/nelsondaza/linear-and-github-extension/releases).

Some web browser extension stores may have an older version currently published. We recommend checking GitHub Releases for the most up-to-date version.

## Security Features

LAGE implements the following security measures:

### 1. **API Key Security**

- Linear API keys are stored securely using Chrome's Storage Sync API
- Keys are never transmitted to external servers (except Linear's official API)
- Keys are encrypted by the browser's built-in security mechanisms

### 2. **Minimal Permissions**

- LAGE only requests necessary host permissions:
  - `*://*.github.com/*` - To inject UI components on GitHub pages
  - `*://*.linear.app/*` - To access Linear API

### 3. **No Data Collection**

- LAGE does not collect, store, or transmit any personal data
- No analytics, tracking, or telemetry
- See our [Privacy Policy](./PRIVACY.md) for details

### 4. **Content Security Policy**

- Strict CSP to prevent XSS attacks
- No inline scripts or eval()
- Limited external resource loading

## Reporting a Security Vulnerability

We appreciate responsible disclosure of security vulnerabilities. If you discover a security issue, please follow these guidelines:

### 🚨 How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues using one of the following methods:

1. **Preferred Method**: Open a [GitHub Security Advisory](https://github.com/nelsondaza/linear-and-github-extension/security/advisories/new)

   - This allows for private discussion before public disclosure
   - GitHub will assist in coordinating the fix and disclosure

2. **Alternative Method**: Email the maintainer directly

   - Send details to: [security contact - to be added by maintainer]
   - Use PGP encryption if possible (public key available upon request)

3. **GitHub Issues** (for non-critical issues only)
   - For minor security concerns that don't involve active exploits
   - Label the issue with "security" tag

### 📝 What to Include in Your Report

Please provide as much information as possible:

- **Description**: Clear explanation of the vulnerability
- **Impact**: Potential consequences if exploited
- **Affected Version(s)**: Which version(s) are vulnerable
- **Reproduction Steps**: Detailed steps to reproduce the issue
- **Proof of Concept**: Code, screenshots, or video demonstration (if applicable)
- **Suggested Fix**: If you have ideas on how to fix it (optional)
- **Disclosure Timeline**: Your expectations for disclosure (we aim for 90 days)

### 📋 Example Report Template

```markdown
## Vulnerability Summary

Brief description of the vulnerability

## Severity

Critical / High / Medium / Low

## Affected Components

- Component 1
- Component 2

## Steps to Reproduce

1. Step 1
2. Step 2
3. Step 3

## Impact

Description of what an attacker could do

## Suggested Fix

Optional: Your recommendations

## Disclosure Preference

When you'd like this to be disclosed publicly
```

## Our Response Process

When you report a vulnerability:

1. **Acknowledgment** (Within 48 hours)

   - We'll confirm receipt of your report
   - Assign a tracking identifier

2. **Assessment** (Within 7 days)

   - Evaluate severity and impact
   - Determine affected versions
   - Plan remediation timeline

3. **Development** (Varies by severity)

   - Critical: Immediate fix (1-3 days)
   - High: Fast-track fix (3-7 days)
   - Medium: Scheduled fix (7-14 days)
   - Low: Standard development cycle

4. **Testing & Release**

   - Thorough testing of the fix
   - Release patched version
   - Update documentation

5. **Disclosure** (After fix is released)
   - Coordinate public disclosure with reporter
   - Publish security advisory
   - Credit reporter (if desired)

## Security Best Practices for Users

To maximize your security while using LAGE:

### ✅ Do's

- ✅ **Keep LAGE Updated**: Always use the latest version
- ✅ **Protect Your API Key**: Never share your Linear API key
- ✅ **Use Strong Passwords**: Secure your GitHub and Linear accounts
- ✅ **Review Permissions**: Understand what permissions LAGE requires
- ✅ **Monitor Activity**: Check your Linear account for unusual API activity
- ✅ **Download from Official Sources**: Only install from Chrome Web Store or GitHub Releases

### ❌ Don'ts

- ❌ **Don't Share API Keys**: Never commit API keys to version control
- ❌ **Don't Install from Unknown Sources**: Only use official distribution channels
- ❌ **Don't Ignore Updates**: Security patches are important
- ❌ **Don't Use on Public Computers**: Avoid using LAGE on shared devices

## API Key Security

Your Linear API key is sensitive. Here's how LAGE protects it:

### How Keys Are Stored

- Stored using Chrome's `chrome.storage.sync` API
- Encrypted by Chrome using OS-level encryption
- Synced across your Chrome profile (encrypted in transit)
- Never logged or transmitted except to Linear's official API

### Revoking a Compromised Key

If you believe your API key has been compromised:

1. Immediately revoke the key in [Linear Settings](https://linear.app/settings/api)
2. Generate a new API key
3. Update the key in LAGE settings
4. Monitor your Linear account for suspicious activity
5. Report the incident to us if you believe it's related to LAGE

## Security Updates

Security updates are published through:

- **GitHub Releases**: [https://github.com/nelsondaza/linear-and-github-extension/releases](https://github.com/nelsondaza/linear-and-github-extension/releases)
- **Chrome Web Store**: Automatic updates for installed users
- **Security Advisories**: Critical issues published at [GitHub Security Advisories](https://github.com/nelsondaza/linear-and-github-extension/security/advisories)

## Scope

This security policy applies to:

- ✅ The LAGE browser extension code
- ✅ Distribution packages (Chrome Web Store, GitHub Releases)
- ✅ Official documentation and website
- ✅ Infrastructure we control (GitHub repository, GitHub Pages)

This security policy does NOT apply to:

- ❌ Third-party services (Linear, GitHub, Chrome Web Store)
- ❌ User's own systems and configurations
- ❌ Forks or unofficial distributions
- ❌ Dependencies (report to respective maintainers)

## Bug Bounty Program

We currently do not offer a bug bounty program. However, we deeply appreciate security researchers' contributions and will:

- Publicly credit you in release notes (unless you prefer to remain anonymous)
- List you in our security acknowledgments
- Provide a reference letter upon request

## Security Hall of Fame

We honor security researchers who responsibly disclose vulnerabilities:

<!-- This section will be updated as security issues are reported and resolved -->

_No security issues have been reported yet. Be the first to help us improve!_

## Contact

For security-related inquiries:

- **Security Issues**: Use GitHub Security Advisories (preferred)
- **General Security Questions**: Open a [GitHub Discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Project Maintainer**: [@nelsondaza](https://github.com/nelsondaza)

## Additional Resources

- [OWASP Browser Extension Security](https://owasp.org/www-community/vulnerabilities/Browser_extension_security)
- [Chrome Extension Security Guidelines](https://developer.chrome.com/docs/extensions/mv3/security/)
- [Linear API Security](https://developers.linear.app/docs/graphql/working-with-the-graphql-api#authentication)

## Legal

This security policy is provided in good faith and does not constitute a legal contract. We reserve the right to modify this policy at any time.

---

**Last Updated**: December 2025  
**Version**: 1.1
