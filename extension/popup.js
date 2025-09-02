document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const testBtn = document.getElementById('testBtn');
  const statusDiv = document.getElementById('status');
  
  chrome.storage.local.get(['serpapi_key'], (result) => {
    if (result.serpapi_key) {
      apiKeyInput.value = result.serpapi_key;
      showStatus('API key loaded', 'info');
    }
  });
  
  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }
    
    chrome.storage.local.set({ serpapi_key: apiKey }, () => {
      showStatus('API key saved successfully!', 'success');
      console.log('API key saved');
    });
  });
  
  testBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key first', 'error');
      return;
    }
    
    showStatus('Testing API key...', 'info');
    
    try {
      const response = await fetch(`https://serpapi.com/search?api_key=${apiKey}&q=test&engine=google&num=1`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.search_metadata) {
          showStatus('API key is valid! Test search successful', 'success');
          chrome.storage.local.set({ serpapi_key: apiKey });
        } else {
          showStatus('API key might be invalid', 'error');
        }
      } else if (response.status === 401) {
        showStatus('Invalid API key', 'error');
      } else {
        showStatus(`Test failed: ${response.status}`, 'error');
      }
    } catch (error) {
      showStatus('Network error. Check your connection', 'error');
      console.error('Test error:', error);
    }
  });
  
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    if (type !== 'info') {
      setTimeout(() => {
        statusDiv.className = 'status';
      }, 3000);
    }
  }
  
  apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });
});