document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup DOMContentLoaded");

  var loadingElement = document.getElementById("loading");
  var codeSnippetElement = document.getElementById("codeSnippet");

  function showLoading() {
    console.log("Show loading");
    loadingElement.style.display = 'block';
    codeSnippetElement.value = '';
  }

  function hideLoading() {
    console.log("Hide loading");
    loadingElement.style.display = 'none';
  }

  // Define code templates
  const codeTemplates = {
    sorting: `
      function sortArray(arr) {
        // Implement sorting logic here
        return arr.sort((a, b) => a - b);
      }
    `,
    // Add more templates for other types of problems as needed
  };

  // Function to generate a solution based on the problem type
  function generateSolution(problemType) {
    return codeTemplates[problemType] || 'No template available for this problem type.';
  }

  // Function to handle the display of the solution
  function displaySolution(solution) {
    codeSnippetElement.textContent = solution;
    Prism.highlightElement(codeSnippetElement);
  }

  function generateAndDisplaySolution(problemType) {
    // Generate solution based on the identified problem type
    var solution = generateSolution(problemType);

    // Display the solution
    displaySolution(solution);

    // Optionally, you can save the solution to storage or perform other actions
  }

  chrome.storage.sync.get(['preferredLanguage'], function (result) {
    var languageSelect = document.getElementById('language');
    if (languageSelect) {
      languageSelect.value = result.preferredLanguage || 'javascript';
    } else {
      console.error("Language select element not found.");
    }
  });

  var saveButton = document.getElementById('saveButton');
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      console.log("Save button clicked");
      var languageSelect = document.getElementById('language');
      if (languageSelect) {
        var preferredLanguage = languageSelect.value;

        chrome.storage.sync.set({'preferredLanguage': preferredLanguage }, function () {
          alert('Options saved!');
        });
      } else {
        console.error("Language select element not found.");
      }
    });
  } else {
    console.error("Save button element not found.");
  }

  var extractButton = document.getElementById('extractButton');
  if (extractButton) {
    extractButton.addEventListener('click', function () {
      console.log("Extract button clicked");
      showLoading();

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        try {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'extractCode'}, function (response) {
            hideLoading();

            if (chrome.runtime.lastError) {
              console.error('Error in sendMessage:', chrome.runtime.lastError);
              console.error('Error details:', chrome.runtime.lastError.message, chrome.runtime.lastError.stack);
            }

            // Check if response is defined and has the expected property
            if (response && response.codeSnippet) {
              console.log("Code snippet found:", response.codeSnippet);
              codeSnippetElement.textContent = response.codeSnippet;
              Prism.highlightElement(codeSnippetElement);

              // Generate and display the solution
              generateAndDisplaySolution(response.problemType);
            } else {
              console.log("No code snippet found.");
              codeSnippetElement.value = 'No code snippet found.';
            }
          });
        } catch (error) {
          console.error('Error in sendMessage:', error);
          console.error('Error details:', error.message, error.stack);
        }
      });
    });
  } else {
    console.error("Extract button element not found.");
  }
});
