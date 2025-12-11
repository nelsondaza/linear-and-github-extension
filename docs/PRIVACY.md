# Privacy Policy

**Last Updated**: December 2025  
**Effective Date**: December 2025

## Our Privacy Commitment

Linear And GitHub Extension (LAGE) is committed to protecting your privacy. This policy explains what data we collect (or rather, don't collect), how we handle it, and your rights.

**TL;DR**: LAGE collects zero personal data. Your API keys stay on your device. No tracking, no analytics, no third-party data sharing.

---

## Table of Contents

- [Data Collection](#data-collection)
- [Data Storage](#data-storage)
- [Data Usage](#data-usage)
- [Third-Party Services](#third-party-services)
- [Your Rights](#your-rights)
- [Children's Privacy](#childrens-privacy)
- [Changes to This Policy](#changes-to-this-policy)
- [Contact](#contact)

---

## Data Collection

### What We DON'T Collect

LAGE has **never collected** and will **never collect**:

- ❌ Personal information (name, email, address, etc.)
- ❌ Browsing history
- ❌ GitHub activity or repository data
- ❌ Linear workspace or issue data
- ❌ IP addresses
- ❌ Device identifiers
- ❌ Location data
- ❌ Usage analytics or telemetry
- ❌ Crash reports
- ❌ Any personally identifiable information (PII)

### What We DO Store (Locally Only)

LAGE stores the following data **locally on your device**:

- ✅ **Linear API Key**: Required for authentication with Linear's API

  - Stored securely using Chrome's Storage Sync API
  - Never transmitted to any server except Linear's official API
  - Encrypted by your browser

- ✅ **Extension Settings**: Your preferences for the extension
  - UI preferences (if any)
  - Feature toggles (if any)
  - Stored locally, synced across your Chrome profile (if sync is enabled)

**Important**: All data is stored locally and controlled by you. Uninstalling the extension removes all stored data.

### Future Data Collection (Opt-In Only)

In the future, LAGE **may** collect (with your explicit permission):

- Browser version and platform name (to optimize compatibility)
- Display settings (to improve UI/UX)
- Feature usage statistics (to decide on new features)

**This will only happen if**:

- You explicitly opt-in
- We implement this feature
- We provide a clear way to opt-out

**We will NOT collect**:

- Browsing history
- Personal identifiers
- Any data that could identify you

---

## Data Storage

### Local Storage Methods

LAGE uses browser-native storage APIs:

#### Chrome/Edge (Chromium)

- **Storage API**: `chrome.storage.sync` for settings and API keys
- **Encryption**: Handled by the browser's built-in security
- **Sync**: Optionally synced across devices signed into your Chrome profile (encrypted in transit)

#### Safari (Future Support)

- **Storage API**: User's defaults database of Safari Web Extensions API
- **Purchases**: Handled by iTunes (App Store)

### Data Security

Your data is protected by:

- Browser-level encryption
- No server-side storage
- No transmission to third parties (except Linear API)
- Secure Chrome Storage API
- HTTPS-only communication with Linear

### Data Retention

- **During Use**: Data is retained as long as the extension is installed
- **After Uninstall**: All data is immediately deleted
- **No Cloud Storage**: LAGE does not use any cloud storage services

---

## Data Usage

### How Your Data Is Used

1. **Linear API Key**

   - Purpose: Authenticate with Linear's API to fetch issue data
   - Transmission: Only sent to Linear's official API endpoints
   - Storage: Encrypted and stored locally

2. **Extension Settings**
   - Purpose: Maintain your preferences
   - Transmission: Never transmitted anywhere
   - Storage: Stored locally, optionally synced via Chrome

### What We DO NOT Do

- ❌ Sell your data
- ❌ Share your data with third parties
- ❌ Use your data for advertising
- ❌ Transmit your data to our servers (we don't have any!)
- ❌ Track your behavior
- ❌ Profile you
- ❌ Build user databases

---

## Third-Party Services

LAGE interacts with the following third-party services:

### 1. Linear (linear.app)

**Purpose**: Fetch issue data to display on GitHub pages

**Data Transmitted**:

- Your Linear API key (for authentication)
- Issue IDs detected on GitHub pages

**Privacy Policy**: [Linear Privacy Policy](https://linear.app/privacy)

**Your Control**: You provide the API key and can revoke it at any time in Linear settings

### 2. GitHub (github.com)

**Purpose**: Inject UI components on GitHub pages

**Data Transmitted**: None. LAGE only reads page content locally.

**Privacy Policy**: [GitHub Privacy Policy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)

### 3. Chrome Web Store

**Purpose**: Extension distribution and updates

**Data Collected**: Per Google's Chrome Web Store policies

**Privacy Policy**: [Google Privacy Policy](https://policies.google.com/privacy)

### 4. GitHub Pages (nelsondaza.github.io)

**Purpose**: Project website and documentation

**Data Collected**: GitHub Pages may collect basic web analytics (IP addresses, user agents)

**Privacy Policy**: [GitHub Privacy Policy](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)

**Note**: This is separate from the LAGE extension itself.

### 5. Open Collective (Future: Donations)

**Purpose**: Process donations (if implemented)

**Payment Processors**: Stripe and PayPal

**Privacy Policies**:

- [Open Collective Privacy Policy](https://opencollective.com/privacypolicy)
- [Stripe Privacy Policy](https://stripe.com/privacy)
- [PayPal Privacy Policy](https://www.paypal.com/us/legalhub/privacy-full)

---

## Your Rights

You have complete control over your data:

### Right to Access

- All your data is stored locally on your device
- Access it via Chrome Developer Tools > Application > Storage

### Right to Delete

1. Uninstall the extension to delete all data
2. Or manually clear extension storage in browser settings
3. Revoke your Linear API key in [Linear Settings](https://linear.app/settings/api)

### Right to Opt-Out

- You can stop using the extension at any time
- No data is collected without your explicit consent

### Right to Data Portability

- Export your settings from Chrome's storage (if needed)
- Your Linear API key can be retrieved from extension settings

---

## Children's Privacy

LAGE is not directed at children under the age of 13 (or the applicable age in your jurisdiction). We do not knowingly collect personal information from children.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.

---

## Data Breach Notification

In the unlikely event of a data breach:

- We will notify affected users promptly
- We will provide details about what data was affected
- We will take immediate action to secure the extension

**Note**: Since LAGE doesn't collect or store data on servers, traditional data breaches are not applicable. However, we monitor for security vulnerabilities in the extension itself.

---

## International Data Transfers

Since LAGE doesn't collect or transmit data to servers:

- No international data transfers occur
- Your data stays on your device
- Only your Linear API key is transmitted to Linear's servers (per their privacy policy)

---

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be:

- Posted on this page
- Reflected in the "Last Updated" date
- Announced in release notes (for significant changes)
- Communicated via GitHub (issues, discussions, or releases)

**Your continued use** of LAGE after changes constitutes acceptance of the updated policy.

---

## Compliance

LAGE strives to comply with:

- **GDPR** (General Data Protection Regulation - EU)
- **CCPA** (California Consumer Privacy Act - USA)
- **COPPA** (Children's Online Privacy Protection Act - USA)
- Chrome Web Store policies
- Other applicable privacy regulations

**Compliance is easy** because we don't collect personal data!

---

## Contact

If you have questions or concerns about privacy:

- **GitHub Issues**: [Open an issue](https://github.com/nelsondaza/linear-and-github-extension/issues)
- **GitHub Discussions**: [Start a discussion](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Maintainer**: [@nelsondaza](https://github.com/nelsondaza)

---

## Additional Resources

- [Security Policy](./SECURITY.md) - How we protect your data
- [Linear API Key Guide](./linear_API_KEY.md) - How to generate and manage your API key
- [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

---

## Summary

**What LAGE Does**:

- ✅ Stores your Linear API key locally (encrypted)
- ✅ Stores your settings locally
- ✅ Sends your API key only to Linear's API
- ✅ Respects your privacy completely

**What LAGE Does NOT Do**:

- ❌ Collect personal data
- ❌ Track your browsing
- ❌ Share data with third parties
- ❌ Use analytics or telemetry
- ❌ Store data on servers

---

**Your privacy is our priority. Questions? We're here to help!**

---

_This privacy policy applies only to the LAGE browser extension and not to any third-party services it integrates with._
