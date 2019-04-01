// 能够访问所有的页面，相当于全局变量

const updateIcon = isPressed =>
    chrome.browserAction.setIcon({
        path: `icon_128${isPressed ? "_pressed" : ""}.png`
    });

let __actived = false;

function SetActivated() {
    __actived = true;
    updateIcon(__actived);
}

function DeActivated() {
    __actived = false;
    updateIcon(__actived);
}

function IsActivated() {
    return __actived;
}

!(() => {

    chrome.browserAction.onClicked = tab => {
        console.log(tab)
    };

    chrome.tabs.onActivated = async tab => {
        if (__actived) {
            console.log(tab, "tabs.onActivated");
        }
    };
    chrome.tabs.onUpdated = chrome.tabs.onActivated;

})();
