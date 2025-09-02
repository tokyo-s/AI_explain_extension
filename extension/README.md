# Quick Search with SerpAPI - Firefox Extension

A Firefox extension that allows you to select text on any webpage and search it via Google using the SerpAPI with a single click.

## Features

- 🔍 **Quick Text Search**: Select any text on a webpage to see a search button
- 🚀 **One-Click Search**: Click the floating button to search instantly
- 🔑 **Secure API Key Storage**: Your SerpAPI key is stored securely in browser storage
- 📋 **Context Menu Integration**: Right-click selected text to search
- 🎨 **Beautiful UI**: Clean, modern interface that doesn't interfere with webpages

## Installation Methods

### Prerequisites

1. **Get a SerpAPI Key** (Free tier available):
   - Go to [SerpAPI Sign Up](https://serpapi.com/users/sign_up)
   - Create an account
   - Get your API key from [Manage API Key](https://serpapi.com/manage-api-key)

### Method 1: Self-Signed Installation (Recommended - Works in Regular Firefox)

1. **Get Mozilla API Credentials**:
   - Go to [addons.mozilla.org/developers/addon/api/key/](https://addons.mozilla.org/developers/addon/api/key/)
   - Generate API credentials (one-time setup)

2. **Set Up and Sign**:
   ```bash
   cd extension
   copy .env.example .env
   # Edit .env with your credentials
   sign.bat
   ```

3. **Install Permanently**:
   - Open Firefox (regular version)
   - Drag the signed `.xpi` from `web-ext-artifacts` to Firefox
   - Click "Add" - extension is now permanently installed!
   - Your extension stays private (not published)

**See [SIGNING_GUIDE.md](SIGNING_GUIDE.md) for detailed instructions**

### Method 2: Firefox Developer Edition/Nightly (No Signing Required)

1. **Build the Extension**:
   ```bash
   cd extension
   build.bat
   ```

2. **Install in Firefox Developer Edition or Nightly**:
   - Type `about:config` in address bar
   - Set `xpinstall.signatures.required` to `false`
   - Drag the unsigned `.xpi` from `web-ext-artifacts` to Firefox

### Method 3: Firefox Add-ons Store (For Public Distribution)

1. **Build and Sign the Extension**:
   - Create a developer account at [addons.mozilla.org](https://addons.mozilla.org/developers/)
   - Build the extension using `build.bat`
   - Submit the `.xpi` file for review
   - Once approved, it will be available for all Firefox users


### Method 4: Temporary Installation (For Development)

1. **Load in Firefox**:
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on"
   - Navigate to the extension folder and select `manifest.json`

2. **Configure Your API Key**:
   - Click the extension icon in the toolbar
   - Enter your SerpAPI key
   - Click "Save Key"
   - Test the connection with "Test Search"

## Usage

### Method 1: Text Selection
1. Select any text on a webpage
2. A search button (🔍) will appear near the selected text
3. Click the button to search

### Method 2: Context Menu
1. Select text on a webpage
2. Right-click the selected text
3. Choose "Search with SerpAPI" from the context menu

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── background.js          # Background script for API calls
├── content.js            # Content script for text selection
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── styles.css            # Button styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Development

### Testing Locally

1. Make changes to the extension files
2. Go to `about:debugging` in Firefox
3. Click "Reload" next to the extension
4. Test your changes on any webpage

### Building Icons

If you need to regenerate the icons:

```bash
cd extension
python create_icons.py
```

## API Limits

- Free SerpAPI tier: 100 searches/month
- Paid plans available for more searches
- Check your usage at [SerpAPI Dashboard](https://serpapi.com/dashboard)

## Troubleshooting

### Extension Not Working?

1. **Check API Key**: Make sure your API key is correctly saved
2. **Test Connection**: Use the "Test Search" button in the popup
3. **Check Console**: Press F12 and check for error messages
4. **Permissions**: Ensure the extension has permission to run on the current site

### Search Button Not Appearing?

- Some websites may block content scripts
- Try refreshing the page
- Check if the extension is enabled for the current site

## Privacy & Security

- Your API key is stored locally in your browser
- No data is sent to external servers except SerpAPI
- The extension only activates when you select text
- All searches are performed over HTTPS

## Support

For issues or questions:
- Check the [SerpAPI Documentation](https://serpapi.com/search-api)
- File an issue in this repository
- Contact: vladimir.stojoc@gmail.com

## License

MIT License - feel free to modify and distribute

## Author

Vladimir Stojoc