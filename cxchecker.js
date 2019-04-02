// 该页面会被加载注入到页面当中,通过页面元素和css去操作页面的元素，但是页面元素不能直接访问该js


function _Copy() {
    const __p = document.getElementById("_123456");
    __p.type = "";
    __p.value = a_query;
    __p.select();
    document.execCommand("copy");
    __p.type = "hidden";
}


let __actived = false;
let a_query = "";

function _onclick(e) {
    const node = e.srcElement;
    if (node.tagName === "P" || node.tagName === "ARTICLE" || node.tagName === "DIV") {
        const _p = document.getElementById("_123456");
        if (_p != null) {
            _p.type = "";
            _p.value = node.localName + `${node.classList.length !== 0 ? "." + node.classList[0] : ""}`;
            _p.select();
            document.execCommand("copy");
            _p.type = "hidden";
        }
    }
}

function _onmouseover(ev) {
    ev.preventDefault();

    if (!__actived) {
        return
    }

    let node = ev.srcElement;

    if (node.tagName === "A") {
        // 获取当前标题tag和class

        // 当前标题的数量
        let _query = node.localName + `${node.classList.length !== 0 ? "." + node.classList[0] : ""}`;
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

        const _n = document.querySelectorAll(_query);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '#c88';
            _n[i].style.border = 'solid 2px red';
        }

        a_query = _query;
    }

    if (node.tagName === "P" || node.tagName === "ARTICLE" || node.tagName === "DIV") {
        // 当前标题的数量
        node.style.background = '#cc9e18';
    }
}

function _onmouseout(ev) {
    ev.preventDefault();

    if (!__actived) {
        return
    }

    let node = ev.srcElement;
    if (node.tagName === "A") {

        const _n = a_query !== "" ? document.querySelectorAll(a_query) : [];
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '';
            _n[i].style.border = '';
        }
    }

    if (node.tagName === "P" || node.tagName === "ARTICLE" || node.tagName === "DIV") {
        node.style.background = '';
    }
}


chrome.extension.onRequest.addListener(
    (request, sender, sendResponse) => {
        __actived = request.is_actived;

        if (__actived) {

            if (document.getElementById("_123456") == null) {
                const _p = document.createElement("input");
                _p.id = "_123456";
                _p.type = "hidden";
                document.body.append(_p);
            }

            document.onclick = _onclick;
            document.onmouseover = _onmouseover;
            document.onmouseout = _onmouseout;

        } else {
            const _p = document.getElementById("_123456");
            _p != null ? _p.remove() : null;

            document.onclick = null;
            document.onmouseover = null;
            document.onmouseout = null;
        }

        sendResponse({result: "ok"});
    }
);

