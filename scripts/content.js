chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractCode') {
      var codeSnippet = ''; // Your code extraction logic here
      sendResponse({ codeSnippet: codeSnippet });
    }
  });

  
  function extractCodeFromPage(){
    var codeSnippet = ''; 

    var codeElement = document.querySelectorAll('code, pre');

    codeElement.forEach(function (element) {
        codeSnippet += element.textContent + '\n\n';
    });

    return codeSnippet.trim();
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractCode') {
        var codeSnippet = extractCodeFromPage();
        sendResponse({ codeSnippet: codeSnippet });
    }
  });