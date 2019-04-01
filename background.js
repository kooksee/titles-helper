// 能够访问所有的页面，相当于全局变量
let __actived = false;

const updateIcon = isPressed =>
    chrome.browserAction.setIcon({
        path: `icon_128${isPressed ? "_pressed" : ""}.png`
    });

function IsActivated() {
    return __actived;
}

!(() => {

    chrome.browserAction.onClicked.addListener(tab => {
        __actived = !__actived;
        updateIcon(__actived);
    });

    const __tb = async tab => {

        console.log(tab, "tabs.onActivated");

        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {is_actived: __actived},
                function (response) {
                    console.log(response)
                })
        });
        console.log(tab, "tabs.onActivated");
    };

    chrome.tabs.onActivated.addListener(__tb);
    chrome.tabs.onUpdated.addListener(__tb);

})();
