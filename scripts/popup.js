document.getElementById('extractButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extractCode' }, function(response) {
        document.getElementById('output').innerText = response.codeSnippet || 'No code snippet found.';
      });
    });
  });
  