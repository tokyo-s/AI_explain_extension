# Self-Signing Guide for Firefox Extension

This guide will help you sign your extension for permanent installation in Firefox without publishing it to the Add-ons store.

## What is Self-Signing?

Self-signing allows you to:
- ✅ Install your extension permanently in regular Firefox
- ✅ Keep your extension private (not published)
- ✅ Get automatic updates (if you set up update URL)
- ✅ No need for Firefox Developer Edition

## Prerequisites

1. **Firefox Account**: Create one at [accounts.firefox.com](https://accounts.firefox.com)
2. **Mozilla Developer Account**: Same as your Firefox account
3. **Node.js**: Download from [nodejs.org](https://nodejs.org) if not installed

## Step-by-Step Instructions

### Step 1: Get Your API Credentials

1. **Log in to Mozilla Add-ons Developer Hub**
   - Go to [addons.mozilla.org/developers/](https://addons.mozilla.org/developers/)
   - Sign in with your Firefox account

2. **Generate API Credentials**
   - Navigate to [API Key Management](https://addons.mozilla.org/developers/addon/api/key/)
   - Click "Generate new credentials"
   - You'll receive:
     - **JWT Issuer** (looks like: `user:12345678:987`)
     - **JWT Secret** (64-character string)
   - **SAVE THESE IMMEDIATELY** - The secret is shown only once!

### Step 2: Set Up Your Credentials

1. **Create .env file**
   ```bash
   cd extension
   copy .env.example .env
   ```

2. **Edit .env file**
   Open `.env` in a text editor and add your credentials:
   ```
   AMO_JWT_ISSUER=your-jwt-issuer-here
   AMO_JWT_SECRET=your-jwt-secret-here
   ```

   Example:
   ```
   AMO_JWT_ISSUER=user:12345678:987
   AMO_JWT_SECRET=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f
   ```

### Step 3: Sign Your Extension

1. **Build and Sign**
   ```bash
   cd extension
   sign.bat
   ```

   Or build first, then sign:
   ```bash
   build.bat
   # Choose option 1 when prompted
   ```

2. **Wait for Processing**
   - The signing process takes 1-5 minutes
   - Mozilla validates your extension
   - If successful, a signed .xpi file appears in `web-ext-artifacts/`

### Step 4: Install Your Signed Extension

1. **Open Firefox** (regular version, not Developer)

2. **Install the Extension**
   - Method A: Drag & Drop
     - Open `web-ext-artifacts` folder
     - Drag the signed `.xpi` file into Firefox
     - Click "Add" when prompted
   
   - Method B: Add-ons Manager
     - Type `about:addons` in address bar
     - Click gear icon ⚙️
     - Select "Install Add-on From File..."
     - Navigate to `web-ext-artifacts`
     - Select the signed `.xpi` file
     - Click "Add"

3. **Configure Your API Key**
   - Click the extension icon in toolbar
   - Enter your SerpAPI key
   - Save and test

## Troubleshooting

### "Signing failed" Error

**Invalid Credentials**
- Double-check your JWT Issuer and Secret
- Ensure no extra spaces or quotes in .env file
- Regenerate credentials if needed

**Extension ID Conflict**
- Edit `manifest.json`
- Change the ID in `browser_specific_settings.gecko.id`
- Use format: `yourname@yourextension`

**Validation Errors**
- Run `npx web-ext lint` to check for issues
- Fix any errors reported
- Common issues:
  - Missing permissions
  - Invalid manifest entries
  - Deprecated APIs

### "Cannot be installed" Error

**File Not Signed**
- Ensure you're using the file from `web-ext-artifacts/`
- File should have format: `quick_search_with_serpapi-1.0.0-an+fx.xpi`
- The `an+fx` indicates it's signed

**Corrupted Download**
- Delete the .xpi file
- Run `sign.bat` again
- Try installing the fresh copy

### API Credentials Not Working

**Rate Limiting**
- Mozilla limits API calls
- Wait 5-10 minutes and try again

**Expired Credentials**
- Credentials don't expire, but can be revoked
- Generate new ones if needed

## Security Notes

⚠️ **NEVER commit .env to git**
- The `.gitignore` file excludes it
- Keep your credentials secret

⚠️ **API Secret is sensitive**
- Anyone with your secret can sign extensions as you
- Regenerate if compromised

⚠️ **Extension Updates**
- Increment version in `manifest.json` before re-signing
- Firefox won't update if version number is the same

## Advanced Options

### Automated CI/CD Signing

You can automate signing in GitHub Actions:

```yaml
- name: Sign Extension
  env:
    WEB_EXT_API_KEY: ${{ secrets.AMO_JWT_ISSUER }}
    WEB_EXT_API_SECRET: ${{ secrets.AMO_JWT_SECRET }}
  run: npx web-ext sign --source-dir=. --channel=unlisted
```

### Update Manifest

To enable automatic updates, add to `manifest.json`:

```json
"browser_specific_settings": {
  "gecko": {
    "id": "quicksearch@serpapi.extension",
    "update_url": "https://yourdomain.com/updates.json"
  }
}
```

## Need Help?

- **Mozilla Documentation**: [extensionworkshop.com](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/)
- **Web-ext Tool**: [github.com/mozilla/web-ext](https://github.com/mozilla/web-ext)
- **Support**: vladimir.stojoc@gmail.com

---

Remember: Your signed extension is private and won't appear on the public Add-ons store unless you explicitly submit it for listing.