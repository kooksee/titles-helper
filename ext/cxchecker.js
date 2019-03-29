document.onmousedown = function (ev) {
    const oEvent = ev || event;
    console.log(oEvent.button);
    console.log(oEvent);
};

document.onmouseover = function (ev) {
    const oEvent = ev || event;
    const node = oEvent.srcElement;

    if (node.tagName === "A") {
        // 获取当前标题tag和class

        // 当前标题的数量
        let _query = node.localName + `${node.className !== "" ? "." + node.className : ""}`;
        let _tl = document.querySelectorAll(_query).length;
        let _pnode = node;
        while (1) {
            _pnode = _pnode.parentNode;
            let _pquery = _pnode.localName + " " + _query;

            // 检查标签
            let _tl1 = document.querySelectorAll(_pquery).length;
            if (_tl === _tl1) {
                break
            }

            _pquery = _pnode.localName + `${_pnode.className !== "" ? "." + _pnode.classList[0] : ""}` + " " + _query;
            _tl1 = document.querySelectorAll(_pquery).length;
            if (_tl === _tl1) {
                break
            }

            _query = _pquery;
            _tl = _tl1;
        }

        console.log(_query);
        const _n = document.querySelectorAll(_query);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '#c88';
            _n[i].style.border = 'solid 2px red';
        }
    }
};

document.onmouseout = function (ev) {
    const oEvent = ev || event;
    const node = oEvent.srcElement;

    if (node.tagName === "A") {

        let _query = node.localName + `${node.className !== "" ? "." + node.className : ""}`;
        let _tl = document.querySelectorAll(_query).length;
        let _pnode = node;
        while (1) {
            _pnode = _pnode.parentNode;
            let _pquery = _pnode.localName + " " + _query;

            // 检查标签
            let _tl1 = document.querySelectorAll(_pquery).length;
            if (_tl === _tl1) {
                break
            }

            _pquery = _pnode.localName + `${_pnode.className !== "" ? "." + _pnode.classList[0] : ""}` + " " + _query;
            _tl1 = document.querySelectorAll(_pquery).length;
            if (_tl === _tl1) {
                break
            }

            _query = _pquery;
            _tl = _tl1;
        }

        console.log(_query);
        const _n = document.querySelectorAll(_query);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '';
            _n[i].style.border = '';
        }
    }
};


function onReady() {
    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            for (var i = 0; i < result.length; i++) {
                var result = document.querySelectorAll(request.query);
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