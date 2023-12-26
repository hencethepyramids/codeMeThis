document.addEventListener("DOMContentLoaded", function () {
  var loadingElement = document.getElementById("loading");
  var codeSnippetElement = document.getElementById("codeSnippet");

  function showLoading() {
    loadingElement.style.display = 'block';
    codeSnippetElement.value = '';
  }

  function hideLoading() {
    loadingElement.style.display = 'none';
  }

  chrome.storage.sync.get(['preferredLanguage'], function (result) {
    var languageSelect = document.getElementById('language');
    languageSelect.value = result.preferredLanguage || 'javascript';
  });

  document.getElementById('saveButton').addEventListener("click", function () {
    var languageSelect = document.getElementById('language');
    var preferredLanguage = languageSelect.value;

    chrome.storage.sync.set({'preferredLanguage': preferredLanguage }, function () {
      alert('Options saved!');
    });
  });

  document.getElementById('extractButton').addEventListener('click', function () {
    showLoading();

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extractCode'}, function (response) {
        hideLoading();
        codeSnippetElement.value = response.codeSnippet || 'No code snippet found.';
        Prism.highlightElement(codeSnippetElement);
      });
    });
  });
});
