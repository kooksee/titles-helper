// Copyright (c) 2013 TANIGUCHI Takaki
// License: GPL version 3 or later

var onReady = function () {
    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            var result = document.querySelectorAll(request.query)
            for (var i = 0; i < result.length; i++) {
                var node = result[i];
                node.style.background = '#c88';
                node.style.border = 'solid 2px red';
            }
            sendResponse({length: result.length});
        }
    );
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
