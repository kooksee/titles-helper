// 该页面会被加载注入到页面当中,通过页面元素和css去操作页面的元素，但是页面元素不能直接访问该js

let __actived = false;
document.onclick = function (e) {
    const node = e.srcElement;
    const _p = document.getElementById("_123456");
    _p.value = node.localName + `${node.classList.length !== 0 ? "." + node.classList[0] : ""}`;
    _p.select();
    document.execCommand("copy");
};

document.onmouseover = function (ev) {
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


        document.getElementById("-cc-wrapper").getElementsByTagName("textarea")[0].value = _query;


        const __p = document.getElementById("_123456");
        __p.value = _query;
        __p.select();
        document.execCommand("copy");
    }

    if (node.tagName === "P" || node.tagName === "ARTICLE" || node.tagName === "DIV") {
        // 当前标题的数量
        node.style.background = '#cc9e18';
        document.getElementById("-cc-wrapper").getElementsByTagName("textarea")[0].value = node.localName + `${node.classList.length !== 0 ? "." + node.classList[0] : ""}`;
    }

};

document.onmouseout = function (ev) {
    ev.preventDefault();

    if (!__actived) {
        return
    }

    let node = ev.srcElement;
    if (node.tagName === "A") {

        const __p = document.getElementById("_123456");
        const _n = document.querySelectorAll(__p.value);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '';
            _n[i].style.border = '';
        }
    }

    if (node.tagName === "P" || node.tagName === "ARTICLE" || node.tagName === "DIV") {
        node.style.background = '';
    }
};


chrome.extension.onRequest.addListener(
    (request, sender, sendResponse) => {
        if (request.type === "browser") {
            window.location.reload();
        }

        __actived = request.is_actived;

        if (__actived) {

            if (document.getElementById("_123456") == null) {
                const _p = document.createElement("input");
                _p.id = "_123456";
                document.body.append(_p);
            }

            const _cc = document.getElementById("-cc-wrapper");
            _cc.classList != null ? _cc.classList.add("active") : null;

        } else {
            const _p = document.getElementById("_123456");
            _p != null ? _p.remove() : null;
        }

        sendResponse({result: "ok"});
    }
);

