// 能够访问所有的页面，但是只能点击打开才有效
// 相当于每个页面的局部变量

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

$('#1234567_1').change(function (e) {
    clear();
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, {type: 'css', query: e.currentTarget.value},
            function (response) {
                console.log(response.length)
            })
    })
});



$('#1234567_2').change(function (e) {
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
//
// chrome.browserAction.onClicked.addListener(tab => {
//
//     chrome.tabs.executeScript(tab.id, {
//         code: "alert('sss')"
//     });
//     console.log(tab, "browserAction");
// });
//
// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.executeScript(tabId, {
//         code: "window.__gs && window.__gs.copyToClipboard()"
//     });
//     console.log(tab, "tabs");
// });
