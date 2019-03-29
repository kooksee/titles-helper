chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
    }
);

$('#1234567').change(function (e) {
    clear();
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {type: 'css', query: e.currentTarget.value},
            function (response) {
                console.log(response.length)
            })
    })
});

function clear() {
    chrome.tabs.executeScript(null, {
            code: "document.querySelectorAll('*').forEach(function(e){e.style.background=''});" +
                "document.querySelectorAll('*').forEach(function(e){e.style.border=''});"
        }
    )
}
