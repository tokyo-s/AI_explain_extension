const SERPAPI_BASE_URL = 'https://serpapi.com/search';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'search') {
    performSearch(request.query)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    return true;
  }
});

async function performSearch(query) {
  try {
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      chrome.tabs.create({
        url: chrome.runtime.getURL('popup.html')
      });
      throw new Error('Please set your SerpAPI key first');
    }
    
    const params = new URLSearchParams({
      api_key: apiKey,
      q: query,
      engine: 'google',
      num: 10,
      format: 'json'
    });
    
    const response = await fetch(`${SERPAPI_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.organic_results && data.organic_results.length > 0) {
      const resultsHtml = generateResultsPage(query, data.organic_results);
      const blob = new Blob([resultsHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      chrome.tabs.create({ url });
      
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      
      return { success: true };
    } else {
      chrome.tabs.create({
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
      });
      return { success: true, fallback: true };
    }
  } catch (error) {
    console.error('Search error:', error);
    chrome.tabs.create({
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
    });
    return { error: error.message, fallback: true };
  }
}

function generateResultsPage(query, results) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Search Results: ${query}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #f5f5f5;
        }
        h1 {
          color: #1a73e8;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .result {
          background: white;
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .result-title {
          color: #1a73e8;
          font-size: 18px;
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
        }
        .result-title:hover {
          text-decoration: underline;
        }
        .result-url {
          color: #5f6368;
          font-size: 14px;
          margin-bottom: 8px;
        }
        .result-snippet {
          color: #4d5156;
          font-size: 14px;
          line-height: 1.5;
        }
        .powered-by {
          text-align: center;
          color: #5f6368;
          font-size: 12px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <h1>Search Results for: "${query}"</h1>
      ${results.map(result => `
        <div class="result">
          <a href="${result.link}" target="_blank" class="result-title">${result.title}</a>
          <div class="result-url">${result.displayed_link || result.link}</div>
          <div class="result-snippet">${result.snippet || ''}</div>
        </div>
      `).join('')}
      <div class="powered-by">Powered by SerpAPI</div>
    </body>
    </html>
  `;
}

async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['serpapi_key'], (result) => {
      resolve(result.serpapi_key || null);
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'searchWithSerpAPI',
    title: 'Search "%s" with SerpAPI',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchWithSerpAPI' && info.selectionText) {
    performSearch(info.selectionText);
  }
});