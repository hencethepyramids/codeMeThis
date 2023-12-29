function extractCodeFromPage() {
  try {
    var codeSnippet = '';
    var problemType = '';  // Initialize the problemType variable

    // Your logic to identify the problem type, for simplicity let's assume 'sorting'
    problemType = 'sorting';

    var codeElements = document.querySelectorAll('code, pre');

    codeElements.forEach(function (element) {
      codeSnippet += element.textContent + '\n\n';
    });

    return { codeSnippet: codeSnippet.trim(), problemType: problemType };  // Return both codeSnippet and problemType
  } catch (error) {
    console.error('Error in content script:', error);
    return { codeSnippet: 'Error extracting code', problemType: '' };  // Handle error case
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'extractCode') {
    var extractionResult = extractCodeFromPage();
    sendResponse(extractionResult);
  } else if (request.action === 'identifyProblem') {
    // Here, you can add logic to identify the problem type on the page
    // For simplicity, let's assume the problem type is 'sorting'
    var problemType = 'sorting';

    // Send a message to the background script with the identified problem type
    chrome.runtime.sendMessage({ action: 'identifiedProblem', problemType: problemType });
  }
});
