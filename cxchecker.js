// 该页面会被加载注入到页面当中,通过页面元素和css去操作页面的元素，但是页面元素不能直接访问该js

let __actived = false;

document.onmouseover = function (ev) {
    if (!__actived) {
        return
    }

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

        const _n = document.querySelectorAll(_query);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '#c88';
            _n[i].style.border = 'solid 2px red';
        }

        let _p = document.getElementById("_123456");
        _p.value = _query;
        _p.select();
        document.execCommand("copy");
    }
};

document.onmouseout = function (ev) {
    if (!__actived) {
        return
    }


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

        const _n = document.querySelectorAll(_query);
        for (let i = 0; i < _n.length; i++) {
            _n[i].style.background = '';
            _n[i].style.border = '';
        }
    }
};


chrome.extension.onRequest.addListener(
    (request, sender, sendResponse) => {
        __actived = request.is_actived;
        console.log(request.is_actived);
        sendResponse({result: "ok"});
    }
);


if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}

const _p = document.createElement("input");
_p.id = "_123456";
// _p.setAttribute("type", "hidden");
document.body.append(_p);