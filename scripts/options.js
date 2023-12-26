document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get(['preferredLanguage'], function(result) {
        var languageSelect = document.getElementById('language');
        languageSelect.value = result.preferredLanguage || 'javascript';
    });

    document.getElementById('saveButton').addEventListener("click", function() {
        var languageSelect = document.getElementById('language');
        var preferredLanguage = languageSelect.value;

        chrome.storage.sync.set({'preferredLanguage': preferredLanguage}, function() {
            alert('Options have been saved!');
        });
    });
});
