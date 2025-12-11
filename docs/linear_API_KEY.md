# Linear API Key Setup Guide

## Table of Contents

- [Overview](#overview)
- [Why LAGE Requires an API Key](#why-lage-requires-an-api-key)
- [How to Generate Your API Key](#how-to-generate-your-api-key)
- [How to Configure LAGE](#how-to-configure-lage)
- [API Key Permissions](#api-key-permissions)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)
- [Revoking or Rotating Keys](#revoking-or-rotating-keys)
- [FAQ](#faq)

---

## Overview

LAGE requires a Linear API key to authenticate and fetch issue data from your Linear workspace. This guide will walk you through generating and configuring your API key safely.

**Time Required**: ~2 minutes  
**Prerequisites**: A Linear account with access to at least one workspace

---

## Why LAGE Requires an API Key

The extension needs a Linear API key to:

- **Authenticate** with Linear's GraphQL API
- **Fetch issue details** (title, status, priority, assignee, etc.)
- **Access workspace data** (teams, projects, labels)
- **Provide real-time information** without you leaving GitHub

### What the API Key Allows

✅ **Read-only access** to your Linear issues  
✅ **No write permissions** - LAGE cannot modify your issues  
✅ **Scoped to your account** - Only accesses data you can see  
✅ **Revocable anytime** - You have full control

### Security & Privacy

- Your API key is stored locally on your device using Chrome's secure storage
- Keys are encrypted by your browser
- Never transmitted to any server except Linear's official API
- See our [Security Policy](./SECURITY.md) for details

---

## How to Generate Your API Key

Follow these steps to create a personal API key in Linear:

### Option 1: Direct Link (Fastest)

1. Click this link: [Linear API Settings](https://linear.app/settings/api)
2. Skip to step 3 below

### Option 2: Navigate Manually

1. Go to [Linear](https://linear.app/) and log in
2. Click on your **profile icon** in the bottom left
3. Select **Preferences** (or **Settings**)
4. In the left sidebar, click **API**

### Create Your API Key

3. Scroll down to the **Personal API Keys** section
4. In the **Label** field, enter a descriptive name:

   - Example: `LAGE Extension`
   - Example: `GitHub Integration`
   - Example: `Linear & GitHub Extension`

   _Tip: Use a descriptive label so you remember what it's for_

5. Click the **Create new API Key** button

6. **Copy the generated API key immediately**
   - The key looks like: `lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Important**: You won't be able to see it again!
   - Save it temporarily in a secure place (password manager recommended)

---

## How to Configure LAGE

After generating your API key:

### First-Time Setup

1. **Open the LAGE extension**

   - Click the LAGE icon in your browser toolbar
   - Or right-click the icon and select **Options**

2. **Navigate to Settings**

   - Look for a **Settings** or **Configuration** button
   - This should open the extension's options page

3. **Enter Your API Key**

   - Find the **Linear API Key** input field
   - Paste your API key (starts with `lin_api_`)
   - Click **Save** or **Apply**

4. **Verify the Connection**
   - The extension should confirm the key is valid
   - You may see your Linear workspace name displayed

### Updating an Existing Key

1. Open LAGE settings
2. Clear the old API key
3. Paste the new API key
4. Save changes

---

## API Key Permissions

### What LAGE Can Access

With your API key, LAGE can:

- ✅ Read issue details (title, description, status, priority)
- ✅ Read team and project information
- ✅ Read user profiles (for assignee information)
- ✅ Read workspace metadata

### What LAGE CANNOT Do

LAGE is read-only and cannot:

- ❌ Create, update, or delete issues
- ❌ Change issue status or priority
- ❌ Assign issues to users
- ❌ Add comments
- ❌ Modify any Linear data
- ❌ Access private issues you don't have permission to see

**Note**: Linear's personal API keys inherit the permissions of your user account. LAGE only uses read operations.

---

## Security Best Practices

### ✅ Do's

- ✅ **Use a descriptive label** for your API key in Linear
- ✅ **Store keys securely** (use a password manager)
- ✅ **Rotate keys periodically** (every 3-6 months recommended)
- ✅ **Revoke old keys** when no longer needed
- ✅ **Monitor Linear account activity** regularly
- ✅ **Only install LAGE from official sources** (Chrome Web Store or GitHub Releases)

### ❌ Don'ts

- ❌ **Never share your API key** with anyone
- ❌ **Never commit keys to Git** or version control
- ❌ **Never paste keys in public forums** or support tickets
- ❌ **Don't use the same key** for multiple applications
- ❌ **Don't ignore security warnings** from your browser

### What If Your Key Is Compromised?

If you suspect your API key has been compromised:

1. **Immediately revoke the key** in Linear settings
2. **Generate a new key** following the steps above
3. **Update the key in LAGE** settings
4. **Review your Linear audit logs** for suspicious activity
5. **Report the incident** if you believe it's related to LAGE

---

## Troubleshooting

### "Invalid API Key" Error

**Possible causes:**

- Key copied incorrectly (check for extra spaces)
- Key was revoked in Linear
- Network connectivity issues

**Solutions:**

1. Verify the key starts with `lin_api_`
2. Try copying and pasting the key again
3. Check your internet connection
4. Generate a new key and try again
5. Check [Linear Status](https://status.linear.app/)

For more troubleshooting help, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#api-key-issues).

### Other Common Issues

For issues related to:

- **Extension not showing Linear issues**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#linear-issues-not-displaying)
- **Extension not loading**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#extension-not-working)
- **Permission errors**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#api-key-issues)

---

## Revoking or Rotating Keys

### When to Revoke a Key

- You no longer use LAGE
- You suspect the key was compromised
- You're switching to a new key (rotation)
- You're leaving a team or organization

### How to Revoke a Key

1. Go to [Linear API Settings](https://linear.app/settings/api)
2. Find your key in the **Personal API Keys** section
3. Click **Revoke** or the **trash icon**
4. Confirm the revocation

**After revoking**: The key is immediately invalidated and LAGE will stop working until you configure a new key.

### Key Rotation (Best Practice)

For enhanced security, rotate your API keys periodically:

1. Generate a new API key (keep the old one active)
2. Update LAGE with the new key
3. Test that LAGE works with the new key
4. Revoke the old key in Linear
5. Document the rotation date for future reference

**Recommended rotation schedule**: Every 3-6 months or after any security incident.

---

## FAQ

### Do I need a paid Linear account?

No, LAGE works with **free Linear accounts**. API keys are available on all Linear plans.

### Can I use the same key for multiple browsers/devices?

Yes, but for better security consider using separate keys to track usage per device and revoke access independently.

### What if I lose my API key?

API keys cannot be retrieved after creation. Generate a new key, revoke the old one, and update LAGE.

### Does the API key expire?

No, Linear personal API keys do not expire automatically. They remain active until you revoke them.

For more questions, see the main [FAQ](./FAQ.md).

---

## Need Help?

If you're still having trouble:

- **Check the [LAGE Documentation](./README.md)**
- **Search [GitHub Issues](https://github.com/nelsondaza/linear-and-github-extension/issues)**
- **Ask in [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)**
- **Contact Linear Support** for Linear-specific issues: [Linear Support](https://linear.app/contact)

---

## Additional Resources

- [Linear API Documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api)
- [Linear API Explorer](https://studio.apollographql.com/public/Linear-API/explorer)
- [LAGE Security Policy](./SECURITY.md)
- [LAGE Privacy Policy](./PRIVACY.md)

---

**Happy integrating! 🎉**
