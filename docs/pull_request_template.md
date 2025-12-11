# Pull Request

## 📝 Summary

<!--
Provide a concise summary of the changes in 1-2 sentences.
What problem does this PR solve? What feature does it add?
Keep this section under 70 characters if possible for better readability in commit logs.
-->

## 📋 Description

<!--
Provide a detailed description of the changes:
- What was changed?
- Why was it changed?
- How does it work?
- Are there any side effects or trade-offs?

If this is a simple change, you can skip this section.
-->

## 🔗 Related Issues

**Refs**: <!-- Link to related issue(s) -->

<!-- Use keywords like: fixes, resolves, closes, refs, relates to, part of -->
<!-- Examples:
- Fixes #123
- Resolves #456
- Closes #789
- Refs LAGE-123 (Linear issue)
- Part of #100
-->

## 🎯 Type of Change

<!-- Check all that apply by replacing [ ] with [x] -->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 📝 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test addition or update
- [ ] 🔧 Configuration change
- [ ] 🏗️ Build or CI/CD change
- [ ] 🔒 Security fix

## 🧪 Test Plan

<!--
Describe how you tested these changes:
- Steps to reproduce the issue (if fixing a bug)
- Steps to verify the fix/feature works
- Edge cases tested
- Browser versions tested
- Manual testing performed
- Automated tests added/updated
-->

**Steps to test**:

1. <!-- Step 1 -->
2. <!-- Step 2 -->
3. <!-- Step 3 -->

**Expected behavior**:

<!-- What should happen after following the steps above? -->

**Actual behavior** (if fixing a bug):

<!-- What was happening before this fix? -->

## 📸 Screenshots / Videos

<!--
If applicable, add screenshots or videos to demonstrate the changes.
Before/after comparisons are especially helpful for UI changes.
Remove this section if not applicable.
-->

**Before**:

<!-- Screenshot or description of the old behavior -->

**After**:

<!-- Screenshot or description of the new behavior -->

## ✅ Checklist

<!-- Check all that apply by replacing [ ] with [x] -->

- [ ] My code follows the project's code style and conventions
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have run `pnpm lint` and it passes with no errors
- [ ] I have run `pnpm lint:tsc` and it passes with no errors
- [ ] I have tested the changes locally (both dev and production builds)
- [ ] I have tested the extension in Chrome
- [ ] Any dependent changes have been merged and published

## 🔍 QA Risk Assessment

**Risk Level**: <!-- low / medium / high -->

<!--
Explain why this change is risky (or not):
- Low: Minor changes, well-tested, limited scope
- Medium: Moderate changes, some areas of uncertainty
- High: Large changes, complex logic, potential for side effects

Include:
- Areas that might be affected
- Potential edge cases or failure modes
- Mitigation strategies
- Rollback plan (if applicable)
-->

## 🚀 Deployment Notes

<!--
Add any notes about deployment:
- Does this require data migration?
- Are there any environment variable changes?
- Does this require a specific deployment order?
- Are there any post-deployment steps?

Remove this section if not applicable.
-->

## 📚 Additional Context

<!--
Add any other context about the pull request here:
- Links to relevant documentation
- Research or design decisions
- Alternative approaches considered
- Known limitations or future improvements
- Dependencies on other PRs

Remove this section if not applicable.
-->

## 👥 Reviewers

<!--
Tag specific reviewers if needed:
@username1
@username2

Or mention the team:
@nelsondaza
-->

---

## 📖 Reviewer Guidelines

### What to Review

- [ ] **Code Quality**: Is the code clean, readable, and maintainable?
- [ ] **Functionality**: Does it work as described?
- [ ] **Edge Cases**: Are edge cases handled properly?
- [ ] **Performance**: Are there any performance concerns?
- [ ] **Security**: Are there any security vulnerabilities?
- [ ] **Tests**: Are there adequate tests (manual or automated)?
- [ ] **Documentation**: Is the documentation updated?
- [ ] **Breaking Changes**: Are breaking changes clearly documented?

### Testing the PR

1. Check out the branch: `git checkout <branch-name>`
2. Install dependencies: `pnpm install --frozen-lockfile`
3. Run development build: `pnpm dev`
4. Load the extension in Chrome from `build/chrome-mv3-dev`
5. Test the changes according to the test plan above
6. Check for console errors or warnings
7. Verify the production build works: `pnpm build && pnpm package`

---

**Thank you for contributing to LAGE! 🎉**
