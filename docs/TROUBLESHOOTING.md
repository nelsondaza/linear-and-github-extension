# Troubleshooting Guide

This guide helps you resolve common issues with Linear And GitHub Extension (LAGE).

## Table of Contents

- [Installation Issues](#installation-issues)
- [API Key Issues](#api-key-issues)
- [Extension Not Working](#extension-not-working)
- [Linear Issues Not Displaying](#linear-issues-not-displaying)
- [Performance Issues](#performance-issues)
- [Browser Compatibility](#browser-compatibility)
- [Development Issues](#development-issues)
- [Getting Help](#getting-help)

---

## Installation Issues

### Extension Won't Install

**Symptoms**: Chrome refuses to install the extension

**Possible Causes**:

- Corrupted download
- Incompatible Chrome version
- Manifest validation errors

**Solutions**:

1. **Verify Chrome Version**

   ```
   Minimum required: Chrome 88+
   Check your version: chrome://settings/help
   ```

2. **Clear Browser Cache**

   - Go to `chrome://settings/clearBrowserData`
   - Select "Cached images and files"
   - Clear data

3. **Download Fresh Copy**

   - Delete the old ZIP file
   - Download again from [GitHub Releases](https://github.com/nelsondaza/linear-and-github-extension/releases)

4. **Manual Installation**
   - Unzip the extension
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the folder

### Extension Installed But Not Appearing

**Symptoms**: Extension icon not visible in toolbar

**Solutions**:

1. **Pin the Extension**

   - Click the puzzle icon in Chrome toolbar
   - Find "Linear And GitHub Extension"
   - Click the pin icon

2. **Check Extension is Enabled**

   - Go to `chrome://extensions/`
   - Ensure LAGE toggle is ON

3. **Restart Chrome**
   - Close all Chrome windows
   - Reopen Chrome

---

## API Key Issues

### "Invalid API Key" Error

**Symptoms**: Extension shows "Invalid API Key" message

**Possible Causes**:

- Key copied incorrectly
- Key revoked in Linear
- Network issues
- Linear API temporarily down

**Solutions**:

1. **Verify Key Format**

   - Should start with `lin_api_`
   - No spaces before or after
   - Complete key string copied

2. **Test Key Manually**

   ```bash
   # Test with curl (replace YOUR_KEY with your actual key)
   curl -H "Authorization: YOUR_KEY" https://api.linear.app/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ viewer { id name } }"}'
   ```

3. **Generate New Key**

   - Follow the [Linear API Key Setup Guide](./linear_API_KEY.md#how-to-generate-your-api-key)
   - Update in LAGE settings

4. **Check Linear Status**
   - Visit [Linear Status](https://status.linear.app/)
   - Check for ongoing incidents

### API Key Not Saving

**Symptoms**: Key disappears after saving

**Possible Causes**:

- Chrome storage quota exceeded
- Chrome sync disabled
- Browser profile issues

**Solutions**:

1. **Check Storage Permissions**

   - Go to `chrome://extensions/`
   - Check LAGE has storage permissions

2. **Clear Extension Storage**

   ```javascript
   // Open LAGE background page console
   // Go to chrome://extensions/ > LAGE > "background page"
   chrome.storage.sync.clear(() => {
     console.log('Storage cleared')
   })
   ```

3. **Disable/Re-enable Chrome Sync**

   - Go to `chrome://settings/syncSetup`
   - Toggle sync off and on

4. **Try Incognito Mode**
   - Enable LAGE in incognito: `chrome://extensions/`
   - Test if key saves there

---

## Extension Not Working

### No UI Elements on GitHub

**Symptoms**: LAGE doesn't appear on GitHub pages

**Possible Causes**:

- Extension disabled
- Wrong GitHub page type
- Content script injection failed
- Conflicting extensions

**Solutions**:

1. **Verify You're on Supported Pages**

   - LAGE only works on GitHub Pull Request and Compare pages
   - See [FAQ](./FAQ.md#what-github-pages-does-lage-work-on) for complete list

2. **Check Console for Errors**

   - Open Chrome DevTools (F12)
   - Check Console tab for errors
   - Look for LAGE-related messages

3. **Reload the Page**

   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

4. **Disable Other Extensions**

   - Go to `chrome://extensions/`
   - Disable other extensions one by one
   - Test after each disable

5. **Check Host Permissions**
   - Go to `chrome://extensions/`
   - Click LAGE details
   - Verify permissions for `github.com` and `linear.app`

### Extension Crashes or Freezes Chrome

**Symptoms**: Chrome becomes unresponsive

**Possible Causes**:

- Memory leak
- Infinite loop in content script
- Too many API requests

**Solutions**:

1. **Disable LAGE**

   - Go to `chrome://extensions/`
   - Toggle LAGE off

2. **Clear Browser Data**

   - Go to `chrome://settings/clearBrowserData`
   - Select all data types
   - Clear data

3. **Update Chrome**

   - Go to `chrome://settings/help`
   - Update to latest version

4. **Report the Issue**
   - Open an issue on [GitHub](https://github.com/nelsondaza/linear-and-github-extension/issues)
   - Include steps to reproduce

---

## Linear Issues Not Displaying

### Issues Detected But Not Showing Details

**Symptoms**: Issue codes detected but no details displayed

**Possible Causes**:

- API rate limiting
- Issues in different workspace
- Insufficient permissions
- Private issues

**Solutions**:

1. **Verify API Key Has Access**

   - Log into [Linear](https://linear.app/)
   - Manually check you can see the issues
   - Verify workspace matches issue prefix

2. **Check Issue Code Format**

   - Valid format: `PROJ-123` (letters/numbers-number)
   - Case-sensitive
   - Must match your workspace teams

3. **Wait and Retry**

   - Linear API has rate limits
   - Wait a few minutes
   - Reload the page

4. **Check Linear Workspace**
   - Ensure you're in the correct workspace
   - API key must be from the same workspace

### No Issues Detected

**Symptoms**: LAGE shows "No Linear issues found"

**Possible Causes**:

- No issue codes in PR/compare
- Issue codes don't match format
- Text is in images or comments

**Solutions**:

1. **Verify Issue Codes Exist**

   - Check PR title, description, commit messages
   - Must match format: `[A-Z0-9]{1,7}-\d+` (e.g., `PROJ-123`)
   - See [FAQ](./FAQ.md#how-does-lage-detect-linear-issues) for detection details

2. **Check Where Codes Are Located**

   - LAGE scans: PR title, description, commit messages
   - LAGE doesn't scan: Comments, file contents, images

3. **Test with Known Issue**
   - Add a test issue code like `TEST-1` to PR description
   - See if LAGE detects it

### Incorrect Issue Details

**Symptoms**: Issue details are wrong or outdated

**Possible Causes**:

- Caching issues
- Linear data updated after fetch
- API response delay

**Solutions**:

1. **Reload the Page**

   - Hard refresh to clear cache
   - `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Clear Extension Storage**

   - Go to `chrome://extensions/`
   - Click LAGE details
   - Click "Clear storage"

3. **Verify in Linear**
   - Open the issue in Linear
   - Compare details with what LAGE shows
   - Report discrepancies on GitHub

---

## Performance Issues

### Extension Slows Down GitHub

**Symptoms**: GitHub pages load slowly

**Possible Causes**:

- Too many API requests
- Large PRs with many issues
- Memory leaks

**Solutions**:

1. **Limit Open Tabs**

   - Close unused GitHub tabs
   - Reduce number of PRs open simultaneously

2. **Disable and Re-enable**

   - Toggle LAGE off when not needed
   - Enable only on pages you need it

3. **Check Chrome Task Manager**

   - `Shift+Esc` to open Task Manager
   - Check LAGE memory usage
   - End process if excessive

4. **Update Extension**
   - Check for latest version
   - Updates may include performance fixes

### Slow API Responses

**Symptoms**: Long loading times for issue details

**Possible Causes**:

- Linear API latency
- Network issues
- Rate limiting

**Solutions**:

1. **Check Network Connection**

   - Test internet speed
   - Try different network

2. **Check Linear Status**

   - Visit [Linear Status](https://status.linear.app/)

3. **Wait for Cache**
   - First load is slower
   - Subsequent loads use cache

---

## Browser Compatibility

### Issues in Chrome

**Minimum Version**: Chrome 88+

**Known Issues**:

- None reported yet

**Solutions**:

- Update to latest Chrome version
- Clear browser cache and cookies

### Issues in Other Browsers

**Firefox**: Not yet supported  
**Edge**: Should work (Chromium-based) but not officially tested  
**Safari**: Not yet supported  
**Opera**: Not tested

**Solutions**:

- Use Chrome for now
- Check [Roadmap](./CHANGELOG.md) for browser support plans

---

## Development Issues

### Build Errors

**Symptoms**: `pnpm build` fails

**Solutions**:

1. **Clean Install**

   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install --frozen-lockfile
   ```

2. **Clean Build**

   ```bash
   rm -rf build/ .plasmo/ tsconfig.tsbuildinfo
   pnpm build
   ```

3. **Check Node Version**

   ```bash
   node --version  # Should be 20.x+
   ```

4. **Check pnpm Version**
   ```bash
   pnpm --version  # Should be 9.12.0
   ```

### Lint Errors

**Symptoms**: `pnpm lint` fails

**Solutions**:

1. **Auto-fix Issues**

   ```bash
   pnpm pretty
   ```

2. **Check Specific Files**

   ```bash
   pnpm lint:files --fix path/to/file.tsx
   ```

3. **Clear ESLint Cache**
   ```bash
   rm -rf build/.eslintcache
   pnpm lint
   ```

### Type Errors

**Symptoms**: `pnpm lint:tsc` fails

**Solutions**:

1. **Clean TypeScript Cache**

   ```bash
   rm tsconfig.tsbuildinfo
   pnpm lint:tsc
   ```

2. **Restart IDE**

   - Close and reopen your code editor
   - VSCode: Cmd/Ctrl+Shift+P > "Reload Window"

3. **Check Type Definitions**
   - Ensure `@types/*` packages are installed
   - Check `tsconfig.json` is correct

### Extension Not Hot Reloading

**Symptoms**: Changes don't appear after saving

**Solutions**:

1. **Restart Dev Server**

   ```bash
   # Stop current server (Ctrl+C)
   rm -rf .plasmo/
   pnpm dev
   ```

2. **Manually Reload Extension**

   - Go to `chrome://extensions/`
   - Click reload button on LAGE

3. **Check File Watcher**
   - Ensure your editor saves files
   - Check file system watchers not at limit (Linux)

---

## Getting Help

### Before Asking for Help

1. **Search Existing Issues**

   - [GitHub Issues](https://github.com/nelsondaza/linear-and-github-extension/issues)
   - Your problem may already be solved

2. **Check Documentation**

   - [README](./README.md)
   - [Linear API Key Guide](./linear_API_KEY.md)
   - [Security Policy](./SECURITY.md)

3. **Gather Information**
   - LAGE version
   - Chrome version
   - Operating system
   - Console errors
   - Steps to reproduce

### Where to Ask

- **Bug Reports**: [GitHub Issues](https://github.com/nelsondaza/linear-and-github-extension/issues/new)
- **Feature Requests**: [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Questions**: [GitHub Discussions](https://github.com/nelsondaza/linear-and-github-extension/discussions)
- **Security Issues**: See [Security Policy](./SECURITY.md)

### What to Include

When reporting issues:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or videos
- Browser console errors
- LAGE version and browser version

---

## Common Error Messages

### "Network error"

- **Cause**: Can't reach Linear API
- **Fix**: Check internet connection, firewall, VPN

### "Permission denied"

- **Cause**: API key lacks permissions
- **Fix**: Generate new key, check workspace access

### "Rate limit exceeded"

- **Cause**: Too many API requests
- **Fix**: Wait a few minutes, reload page

### "Extension context invalidated"

- **Cause**: Extension reloaded while page was open
- **Fix**: Reload the GitHub page

---

## Debug Mode

To enable debug logging:

1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for LAGE messages
4. Include these in bug reports

---

## Still Having Issues?

If none of these solutions work:

1. **Collect Debug Information**

   ```
   - LAGE version
   - Chrome version: chrome://version
   - Console errors (F12 > Console)
   - Network requests (F12 > Network)
   ```

2. **Open an Issue**

   - [Create new issue](https://github.com/nelsondaza/linear-and-github-extension/issues/new)
   - Include all debug information
   - Describe what you've tried

3. **Be Patient**
   - Maintainers will respond as soon as possible
   - Provide any additional information requested

---

**Thank you for using LAGE! We're here to help.** 🙏
