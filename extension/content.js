let searchButton = null;
let selectedText = '';

function createSearchButton() {
  const button = document.createElement('div');
  button.id = 'serpapi-search-button';
  button.innerHTML = '🔍';
  button.title = 'Search with SerpAPI';
  button.style.display = 'none';
  document.body.appendChild(button);
  return button;
}

function showSearchButton(x, y) {
  if (!searchButton) {
    searchButton = createSearchButton();
  }
  
  searchButton.style.left = `${x}px`;
  searchButton.style.top = `${y - 40}px`;
  searchButton.style.display = 'block';
  
  setTimeout(() => {
    searchButton.classList.add('visible');
  }, 10);
}

function hideSearchButton() {
  if (searchButton) {
    searchButton.classList.remove('visible');
    setTimeout(() => {
      if (searchButton) {
        searchButton.style.display = 'none';
      }
    }, 200);
  }
}

document.addEventListener('mouseup', (event) => {
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && text.length > 0) {
      selectedText = text;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      showSearchButton(
        rect.left + window.scrollX + rect.width / 2,
        rect.top + window.scrollY
      );
    } else if (!event.target.closest('#serpapi-search-button')) {
      hideSearchButton();
    }
  }, 10);
});

document.addEventListener('click', (event) => {
  if (event.target.id === 'serpapi-search-button') {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Searching for:', selectedText);
    
    chrome.runtime.sendMessage({
      action: 'search',
      query: selectedText
    }, (response) => {
      if (response && response.error) {
        console.error('Search error:', response.error);
        alert('Search failed: ' + response.error);
      }
    });
    
    hideSearchButton();
    window.getSelection().removeAllRanges();
  } else if (!event.target.closest('#serpapi-search-button')) {
    hideSearchButton();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideSearchButton();
    window.getSelection().removeAllRanges();
  }
});

document.addEventListener('scroll', () => {
  hideSearchButton();
});